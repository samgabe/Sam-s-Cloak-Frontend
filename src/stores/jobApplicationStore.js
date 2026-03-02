/**
 * Pinia store for job application state management
 */
import { defineStore } from 'pinia'
import { jobApplicationsAPI } from '../services/api'

export const useJobApplicationStore = defineStore('jobApplications', {
    state: () => ({
        applications: [],
        currentApplication: null,
        statistics: null,
        loading: false,
        error: null
    }),

    getters: {
        /**
         * Get applications by status
         */
        applicationsByStatus: (state) => (status) => {
            return state.applications.filter(app => app.status === status)
        },

        /**
         * Get pending applications count
         */
        pendingCount: (state) => {
            return state.applications.filter(app => app.status === 'PENDING').length
        },

        /**
         * Get analyzed applications count
         */
        analyzedCount: (state) => {
            return state.applications.filter(app => app.status === 'ANALYZED').length
        },

        /**
         * Get applied applications count
         */
        appliedCount: (state) => {
            return state.applications.filter(app => app.status === 'APPLIED').length
        },

        /**
         * Get average match score
         */
        averageMatchScore: (state) => {
            const scored = state.applications.filter(app => app.match_score !== null)
            if (scored.length === 0) return 0
            const sum = scored.reduce((acc, app) => acc + app.match_score, 0)
            return (sum / scored.length).toFixed(1)
        }
    },

    actions: {
        /**
         * Fetch all applications
         */
        async fetchApplications(params = {}) {
            this.loading = true
            this.error = null
            try {
                this.applications = await jobApplicationsAPI.getApplications(params)
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to fetch applications'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Fetch single application
         */
        async fetchApplication(id) {
            this.loading = true
            this.error = null
            try {
                this.currentApplication = await jobApplicationsAPI.getApplication(id)
                return this.currentApplication
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to fetch application'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Ingest new job posting
         */
        async ingestJobPosting(file, additionalData = {}) {
            this.loading = true
            this.error = null
            try {
                const application = await jobApplicationsAPI.ingestJobPosting(file, additionalData)
                this.applications.unshift(application)
                return application
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to ingest job posting'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Ingest job posting from URL
         */
        async ingestJobFromUrl(jobUrl) {
            this.loading = true
            this.error = null
            try {
                const application = await jobApplicationsAPI.ingestJobFromUrl(jobUrl)
                this.applications.unshift(application)
                return application
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to ingest job from URL'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Analyze application
         */
        async analyzeApplication(id) {
            this.loading = true
            this.error = null
            try {
                const application = await jobApplicationsAPI.analyzeApplication(id)
                this.updateApplicationInList(application)
                if (this.currentApplication?.id === id) {
                    this.currentApplication = application
                }
                return application
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to analyze application'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Generate tailored resume
         */
        async tailorResume(id) {
            this.loading = true
            this.error = null
            try {
                const result = await jobApplicationsAPI.tailorResume(id)
                return result
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to generate resume'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Generate cover letter
         */
        async generateCoverLetter(id) {
            this.loading = true
            this.error = null
            try {
                const result = await jobApplicationsAPI.generateCoverLetter(id)
                return result.cover_letter
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to generate cover letter'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Update application status
         */
        async updateStatus(id, status) {
            this.loading = true
            this.error = null
            try {
                const application = await jobApplicationsAPI.updateStatus(id, status)
                this.updateApplicationInList(application)
                if (this.currentApplication?.id === id) {
                    this.currentApplication = application
                }
                return application
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to update status'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Search applications
         */
        async searchApplications(query, params = {}) {
            this.loading = true
            this.error = null
            try {
                this.applications = await jobApplicationsAPI.searchApplications(query, params)
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to search applications'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Fetch statistics
         */
        async fetchStatistics() {
            this.loading = true
            this.error = null
            try {
                this.statistics = await jobApplicationsAPI.getStatistics()
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to fetch statistics'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Update application in list
         */
        updateApplicationInList(updatedApplication) {
            const index = this.applications.findIndex(app => app.id === updatedApplication.id)
            if (index !== -1) {
                this.applications[index] = updatedApplication
            }
        },

        /**
         * Clear error
         */
        clearError() {
            this.error = null
        }
    }
})
