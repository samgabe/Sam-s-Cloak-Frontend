<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
    <!-- Modern Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                SamsCloak
              </h1>
              <p class="text-xs text-gray-500">AI-Powered Job Application Assistant</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <button class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Dashboard
            </button>
            <button class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Profile
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <!-- Action Buttons -->
      <div class="mb-8 flex flex-col sm:flex-row gap-4">
        <button 
          @click="showUploadModal = true"
          class="flex-1 group relative overflow-hidden px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <div class="flex items-center justify-center space-x-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span class="font-semibold">Upload Screenshot</span>
          </div>
        </button>
        
        <button 
          @click="showUrlModal = true"
          class="flex-1 group relative overflow-hidden px-6 py-4 bg-white text-indigo-600 border-2 border-indigo-600 rounded-xl hover:bg-indigo-50 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <div class="flex items-center justify-center space-x-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <span class="font-semibold">Paste Job URL</span>
          </div>
        </button>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500 font-medium">Total Applications</p>
              <p class="text-3xl font-bold text-gray-900 mt-1">{{ applications.length }}</p>
            </div>
            <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500 font-medium">Analyzed</p>
              <p class="text-3xl font-bold text-green-600 mt-1">{{ analyzedCount }}</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500 font-medium">Applied</p>
              <p class="text-3xl font-bold text-blue-600 mt-1">{{ appliedCount }}</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500 font-medium">Avg Match</p>
              <p class="text-3xl font-bold text-purple-600 mt-1">{{ averageMatchScore }}%</p>
            </div>
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-20">
        <div class="relative">
          <div class="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
        <p class="mt-6 text-gray-600 font-medium">Loading applications...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 shadow-md">
        <div class="flex items-center">
          <svg class="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-red-700 font-medium">{{ error }}</p>
        </div>
      </div>

      <!-- Applications Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <JobCard 
          v-for="application in applications" 
          :key="application.id"
          :application="application"
          @view="viewApplication"
          @analyze="analyzeApplication"
          @tailor="tailorResume"
        />
      </div>

      <!-- Empty State -->
      <div v-if="!loading && applications.length === 0" class="text-center py-20">
        <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">No applications yet</h3>
        <p class="text-gray-500 mb-6">Upload a screenshot or paste a job URL to get started!</p>
        <button 
          @click="showUploadModal = true"
          class="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-md"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Your First Application
        </button>
      </div>
    </main>

    <!-- Upload Screenshot Modal -->
    <div v-if="showUploadModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform transition-all">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Upload Screenshot</h2>
          <button @click="showUploadModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="mb-6">
          <label class="block w-full">
            <div class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-indigo-500 transition-colors cursor-pointer">
              <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p class="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
              <p class="text-xs text-gray-400">PNG, JPG, JPEG or WebP (max 10MB)</p>
            </div>
            <input 
              type="file" 
              @change="handleFileSelect"
              accept="image/*"
              class="hidden"
            />
          </label>
          <p v-if="selectedFile" class="mt-3 text-sm text-green-600 flex items-center">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {{ selectedFile.name }}
          </p>
        </div>
        
        <div class="flex gap-3">
          <button 
            @click="uploadFile"
            :disabled="!selectedFile || uploading"
            class="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {{ uploading ? 'Uploading...' : 'Upload' }}
          </button>
          <button 
            @click="showUploadModal = false"
            class="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- Job URL Modal -->
    <div v-if="showUrlModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform transition-all">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Paste Job URL</h2>
          <button @click="showUrlModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Job Posting URL</label>
          <input 
            v-model="jobUrl"
            type="url"
            placeholder="https://example.com/jobs/123"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
          <p class="mt-2 text-xs text-gray-500">Supports LinkedIn, Indeed, Glassdoor, and more</p>
        </div>
        
        <div class="flex gap-3">
          <button 
            @click="fetchJobFromUrl"
            :disabled="!jobUrl || fetching"
            class="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {{ fetching ? 'Fetching...' : 'Fetch Job' }}
          </button>
          <button 
            @click="showUrlModal = false"
            class="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useJobApplicationStore } from './stores/jobApplicationStore'
import JobCard from './components/JobCard.vue'

const store = useJobApplicationStore()
const showUploadModal = ref(false)
const showUrlModal = ref(false)
const selectedFile = ref(null)
const jobUrl = ref('')
const uploading = ref(false)
const fetching = ref(false)

const applications = ref([])
const loading = ref(false)
const error = ref(null)

const analyzedCount = computed(() => 
  applications.value.filter(app => app.status === 'ANALYZED').length
)

const appliedCount = computed(() => 
  applications.value.filter(app => app.status === 'APPLIED').length
)

const averageMatchScore = computed(() => {
  const scored = applications.value.filter(app => app.match_score !== null)
  if (scored.length === 0) return 0
  const sum = scored.reduce((acc, app) => acc + app.match_score, 0)
  return (sum / scored.length).toFixed(1)
})

onMounted(async () => {
  await loadApplications()
})

const loadApplications = async () => {
  loading.value = true
  error.value = null
  try {
    await store.fetchApplications()
    applications.value = store.applications
  } catch (e) {
    error.value = 'Failed to load applications'
  } finally {
    loading.value = false
  }
}

const handleFileSelect = (event) => {
  selectedFile.value = event.target.files[0]
}

const uploadFile = async () => {
  if (!selectedFile.value) return
  
  uploading.value = true
  try {
    await store.ingestJobPosting(selectedFile.value)
    showUploadModal.value = false
    selectedFile.value = null
    await loadApplications()
  } catch (e) {
    alert('Upload failed: ' + e.message)
  } finally {
    uploading.value = false
  }
}

const fetchJobFromUrl = async () => {
  if (!jobUrl.value) return
  
  fetching.value = true
  try {
    // TODO: Implement URL scraping endpoint
    await store.ingestJobFromUrl(jobUrl.value)
    showUrlModal.value = false
    jobUrl.value = ''
    await loadApplications()
  } catch (e) {
    alert('Failed to fetch job: ' + e.message)
  } finally {
    fetching.value = false
  }
}

const viewApplication = (id) => {
  console.log('View application:', id)
  // TODO: Navigate to details page
}

const analyzeApplication = async (id) => {
  try {
    await store.analyzeApplication(id)
    await loadApplications()
  } catch (e) {
    alert('Analysis failed: ' + e.message)
  }
}

const tailorResume = async (id) => {
  try {
    const resume = await store.tailorResume(id)
    console.log('Tailored resume:', resume)
    // TODO: Show resume in modal or download
  } catch (e) {
    alert('Resume generation failed: ' + e.message)
  }
}
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.job-card {
  animation: fadeIn 0.3s ease-out;
}
</style>
