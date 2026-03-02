/**
 * API service for backend communication
 */
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000 // 10 second timeout
})

// Request interceptor to add auth token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('access_token')
            window.location.href = '/login'
        } else if (error.code === 'ECONNABORTED') {
            error.message = 'Request timeout. Please check your connection.'
        } else if (error.code === 'NETWORK_ERROR') {
            error.message = 'Network error. Please check your connection.'
        } else if (error.response?.status === 500) {
            error.message = 'Server error. Please try again later.'
        }
        return Promise.reject(error)
    }
)

export const jobApplicationsAPI = {
    /**
     * Ingest job posting from screenshot
     */
    async ingestJobPosting(file, additionalData = {}) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('token', localStorage.getItem('access_token'))

        Object.entries(additionalData).forEach(([key, value]) => {
            if (value) formData.append(key, value)
        })

        const response = await apiClient.post('/ingest', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return response.data
    },

    /**
     * Ingest job posting from URL
     */
    async ingestJobFromUrl(jobUrl) {
        const response = await apiClient.post('/ingest-url', null, {
            params: { job_url: jobUrl }
        })
        return response.data
    },

    /**
     * Get all user applications
     */
    async getApplications(params = {}) {
        const response = await apiClient.get('/applications', { params })
        return response.data
    },

    /**
     * Get specific application
     */
    async getApplication(id) {
        const response = await apiClient.get(`/applications/${id}`)
        return response.data
    },

    /**
     * Analyze job application
     */
    async analyzeApplication(id) {
        const response = await apiClient.post(`/applications/${id}/analyze`)
        return response.data
    },

    /**
     * Generate tailored resume
     */
    async tailorResume(id) {
        const response = await apiClient.post(`/applications/${id}/tailor-resume`)
        return response.data
    },

    /**
     * Generate cover letter
     */
    async generateCoverLetter(id) {
        const response = await apiClient.post(`/applications/${id}/cover-letter`)
        return response.data
    },

    /**
     * Update application status
     */
    async updateStatus(id, status) {
        const response = await apiClient.put(`/applications/${id}/status`, { status })
        return response.data
    },

    /**
     * Search applications
     */
    async searchApplications(query, params = {}) {
        const response = await apiClient.get('/applications/search', {
            params: { query, ...params }
        })
        return response.data
    },

    /**
     * Get application statistics
     */
    async getStatistics() {
        const response = await apiClient.get('/statistics')
        return response.data
    }
}

export const authAPI = {
    /**
     * Login user
     */
    async login(email, password) {
        try {
            const response = await apiClient.post('/users/login', { email, password })
            if (response.data.access_token) {
                localStorage.setItem('access_token', response.data.access_token)
            }
            return response.data
        } catch (error) {
            if (error.response?.status === 401) {
                throw new Error('Invalid email or password')
            } else if (error.response?.status === 500) {
                throw new Error('Server error. Please try again later.')
            } else if (error.code === 'ECONNABORTED') {
                throw new Error('Login timeout. Please check your connection.')
            }
            throw error
        }
    },

    /**
     * Register new user
     */
    async register(userData) {
        try {
            const response = await apiClient.post('/users/register', userData)
            return response.data
        } catch (error) {
            if (error.response?.status === 409) {
                throw new Error('Email already registered')
            } else if (error.response?.status === 400) {
                throw new Error(error.response.data.detail || 'Invalid registration data')
            } else if (error.response?.status === 500) {
                throw new Error('Server error. Please try again later.')
            } else if (error.code === 'ECONNABORTED') {
                throw new Error('Registration timeout. Please check your connection.')
            }
            throw error
        }
    },

    /**
     * Get current user
     */
    async getCurrentUser() {
        const response = await apiClient.get('/users/me')
        return response.data
    },

    /**
     * Update user profile
     */
    async updateProfile(userData) {
        const response = await apiClient.put('/users/me', userData)
        return response.data
    },

    /**
     * Update master resume
     */
    async updateMasterResume(resumeData) {
        const response = await apiClient.put('/users/me/resume', resumeData)
        return response.data
    },

    /**
     * Upload master resume file
     */
    async uploadMasterResume(file) {
        const formData = new FormData()
        formData.append('file', file)

        const response = await apiClient.post('/users/me/resume/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    }
}

export default apiClient
