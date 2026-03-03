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
            <div class="relative group">
              <button
                class="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors flex items-center gap-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </button>
              <div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                <button
                  @click="exportMasterResume('pdf')"
                  class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg flex items-center gap-2"
                >
                  <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Download as PDF
                </button>
                <button
                  @click="exportMasterResume('docx')"
                  class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-b-lg flex items-center gap-2"
                >
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download as Word
                </button>
              </div>
            </div>
            <button 
              @click="handleLogout"
              class="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
            >
              Logout
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
            <span class="font-semibold">Upload Job Posting</span>
          </div>
        </button>
        
        <button 
          @click="showUrlModal = true"
          class="flex-1 group relative overflow-hidden px-6 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl hover:from-green-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <div class="flex items-center justify-center space-x-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <span class="font-semibold">Paste Job URL</span>
          </div>
        </button>
        
        <button 
          @click="showResumeModal = true"
          class="flex-1 group relative overflow-hidden px-6 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl hover:from-orange-700 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <div class="flex items-center justify-center space-x-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span class="font-semibold">Upload Resume</span>
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
        <p class="text-gray-500 mb-6">Upload a file or paste a job URL to get started!</p>
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
          <h2 class="text-2xl font-bold text-gray-900">Upload File</h2>
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
              <p class="text-xs text-gray-400">PNG, JPG, JPEG, WebP, or PDF (max 10MB)</p>
            </div>
            <input 
              type="file" 
              @change="handleFileSelect"
              accept="image/*,application/pdf"
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

    <!-- Resume Upload Modal -->
    <div v-if="showResumeModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform transition-all">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Upload Resume</h2>
          <button @click="showResumeModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Resume File</label>
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500 transition-colors">
            <input 
              type="file"
              ref="resumeFileInput"
              @change="handleResumeFileChange"
              accept=".pdf,.docx,.png,.jpg,.jpeg,.webp"
              class="hidden"
            />
            <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p class="text-gray-600 mb-2">Click to upload or drag and drop</p>
            <p class="text-xs text-gray-500">PDF, DOCX, PNG, JPG, WebP (max 10MB)</p>
            <button 
              @click="$refs.resumeFileInput.click()"
              class="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
            >
              Select File
            </button>
          </div>
          
          <div v-if="resumeFile" class="mt-4 p-3 bg-gray-50 rounded-lg">
            <p class="text-sm font-medium text-gray-700">{{ resumeFile.name }}</p>
            <p class="text-xs text-gray-500">{{ (resumeFile.size / 1024 / 1024).toFixed(2) }} MB</p>
          </div>
        </div>
        
        <div class="flex gap-3">
          <button 
            @click="uploadResume"
            :disabled="!resumeFile || uploading"
            class="flex-1 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {{ uploading ? 'Uploading...' : 'Upload Resume' }}
          </button>
          <button 
            @click="showResumeModal = false"
            class="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- Tailored Resume Modal -->
    <div v-if="showTailoredResumeModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl p-8 max-w-4xl w-full shadow-2xl transform transition-all max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Tailored Resume</h2>
          <button @click="showTailoredResumeModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="mb-6">
          <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <h3 class="text-green-800 font-semibold mb-2">✅ Resume Generated Successfully!</h3>
            <p class="text-green-700 text-sm">Your resume has been optimized for the target position.</p>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Original Resume Column -->
            <div class="bg-gray-50 rounded-lg p-6">
              <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2v-4a2 2 0 012-2h6a2 2 0 012 2v4a2 2 0 01-2 2h6a2 2 0 002-2v-4a2 2 0 00-2-2z" />
                </svg>
                Your Original Resume
              </h4>
              <div class="bg-white rounded border border-gray-200 p-4 max-h-96 overflow-y-auto">
                <pre class="whitespace-pre-wrap text-xs text-gray-700 font-mono">{{ originalResume }}</pre>
              </div>
            </div>
            
            <!-- Tailored Resume Column -->
            <div class="bg-green-50 rounded-lg p-6">
              <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2l2-2m-2 4l2-2m-2 4l2-2m6 2l2-2m-2 4l2-2" />
                </svg>
                AI-Optimized Resume
              </h4>
              <div class="bg-white rounded border border-green-200 p-4 max-h-96 overflow-y-auto">
                <pre class="whitespace-pre-wrap text-xs text-gray-800 font-mono">{{ tailoredResume }}</pre>
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex gap-3 mt-6 pt-6 border-t border-gray-200">
          <button 
            @click="downloadTailoredResume('pdf')"
            class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Download PDF
          </button>
          <button 
            @click="downloadTailoredResume('docx')"
            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Word
          </button>
          <button 
            @click="copyTailoredResume"
            class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy Text
          </button>
          <button 
            @click="showTailoredResumeModal = false"
            class="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>

    <!-- Application Details Modal -->
    <div v-if="showDetailsModal && selectedApplication" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl p-8 max-w-4xl w-full shadow-2xl transform transition-all max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Application Details</h2>
          <button @click="showDetailsModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Left Column - Job Info -->
          <div>
            <div class="mb-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ selectedApplication.job_title }}</h3>
              <p class="text-gray-600 mb-4">{{ selectedApplication.company_name }}</p>
              
              <div class="space-y-3">
                <div v-if="selectedApplication.location" class="flex items-center gap-2 text-sm">
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span class="text-gray-700">{{ selectedApplication.location }}</span>
                </div>
                
                <div v-if="selectedApplication.remote_type" class="flex items-center gap-2 text-sm">
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0110.5 8h.5a2 2 0 012 2v10.945M19 3.935V5.5A2.5 2.5 0 0016.5 8h-.5a2 2 0 00-2 2v10.945M19 19V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2z" />
                  </svg>
                  <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">{{ selectedApplication.remote_type }}</span>
                </div>
                
                <div class="flex items-center gap-2 text-sm">
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span class="text-gray-700">Added {{ formatDate(selectedApplication.created_at) }}</span>
                </div>
              </div>
            </div>
            
            <!-- Match Score -->
            <div v-if="selectedApplication.match_score !== null" class="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 class="font-semibold text-gray-900 mb-3">Match Score</h4>
              <div class="flex items-center gap-3 mb-2">
                <div class="flex-1 bg-gray-200 rounded-full h-3">
                  <div 
                    :class="getScoreColor(selectedApplication.match_score)"
                    class="h-3 rounded-full transition-all"
                    :style="{ width: `${selectedApplication.match_score}%` }"
                  ></div>
                </div>
                <span class="font-bold text-lg" :class="getScoreColor(selectedApplication.match_score).replace('bg-', 'text-')">
                  {{ selectedApplication.match_score }}%
                </span>
              </div>
            </div>
          </div>
          
          <!-- Right Column - Analysis -->
          <div>
            <div v-if="selectedApplication.ai_analysis" class="mb-6">
              <h4 class="font-semibold text-gray-900 mb-3">AI Analysis</h4>
              <div class="space-y-4">
                <div v-if="selectedApplication.ai_analysis.strengths">
                  <h5 class="font-medium text-green-700 mb-2">Strengths</h5>
                  <ul class="list-disc list-inside text-sm text-gray-700 space-y-1">
                    <li v-for="strength in selectedApplication.ai_analysis.strengths" :key="strength">
                      {{ strength }}
                    </li>
                  </ul>
                </div>
                
                <div v-if="selectedApplication.ai_analysis.gaps">
                  <h5 class="font-medium text-orange-700 mb-2">Areas to Improve</h5>
                  <ul class="list-disc list-inside text-sm text-gray-700 space-y-1">
                    <li v-for="gap in selectedApplication.ai_analysis.gaps" :key="gap">
                      {{ gap }}
                    </li>
                  </ul>
                </div>
                
                <div v-if="selectedApplication.ai_analysis.recommendations">
                  <h5 class="font-medium text-blue-700 mb-2">Recommendations</h5>
                  <ul class="list-disc list-inside text-sm text-gray-700 space-y-1">
                    <li v-for="rec in selectedApplication.ai_analysis.recommendations" :key="rec">
                      {{ rec }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <!-- Job Description -->
            <div v-if="selectedApplication.job_description" class="mb-6">
              <h4 class="font-semibold text-gray-900 mb-3">Job Description</h4>
              <div class="p-4 bg-gray-50 rounded-lg max-h-64 overflow-y-auto">
                <p class="text-sm text-gray-700 whitespace-pre-wrap">{{ selectedApplication.job_description }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Actions -->
        <div class="flex gap-3 mt-6 pt-6 border-t border-gray-200">
          <button 
            @click="analyzeApplication(selectedApplication.id)"
            :disabled="analyzing"
            class="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {{ analyzing ? 'Analyzing...' : 'Analyze' }}
          </button>
          <button
            @click="openEmailModal(selectedApplication.id)"
            :disabled="generatingEmail"
            class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {{ generatingEmail ? 'Generating Email...' : 'Generate Email' }}
          </button>
          <button 
            @click="showDetailsModal = false"
            class="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>

    <!-- Application Email Modal -->
    <div v-if="showEmailModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl transform transition-all max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Application Email</h2>
          <button @click="showEmailModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              type="text"
              v-model="emailSubject"
              readonly
              class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Body</label>
            <textarea
              v-model="emailBody"
              readonly
              rows="8"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm whitespace-pre-wrap"
            ></textarea>
          </div>
        </div>

        <div class="flex gap-3 mt-6 pt-6 border-t border-gray-200">
          <button
            @click="copyEmailToClipboard"
            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Copy Email
          </button>
          <button
            @click="showEmailModal = false"
            class="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useJobApplicationStore } from '../stores/jobApplicationStore'
import JobCard from '../components/JobCard.vue'
import { authAPI, documentsAPI } from '../services/api'

const router = useRouter()
const store = useJobApplicationStore()
const showUploadModal = ref(false)
const showUrlModal = ref(false)
const showDetailsModal = ref(false)
const showResumeModal = ref(false)
const showTailoredResumeModal = ref(false)
const showEmailModal = ref(false)
const selectedFile = ref(null)
const selectedApplication = ref(null)
const resumeFile = ref(null)
const tailoredResume = ref('')
const tailoredDocumentId = ref(null)
const originalResume = ref('Loading original resume...')
const jobUrl = ref('')
const uploading = ref(false)
const fetching = ref(false)
const downloadingMasterResume = ref(false)

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
  return Math.round(sum / scored.length)
})

const analyzing = ref(false)
const generatingEmail = ref(false)
const emailSubject = ref('')
const emailBody = ref('')

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

const getScoreColor = (score) => {
  if (score >= 80) return 'bg-green-500'
  if (score >= 60) return 'bg-yellow-500'
  return 'bg-red-500'
}

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
    console.error('Load error:', e)
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
  // Navigate to application details
  selectedApplication.value = applications.value.find(app => app.id === id)
  showDetailsModal.value = true
}

const analyzeApplication = async (id) => {
  analyzing.value = true
  try {
    await store.analyzeApplication(id)
    await loadApplications()
    // Update selected application if details modal is open
    if (selectedApplication.value && selectedApplication.value.id === id) {
      selectedApplication.value = applications.value.find(app => app.id === id)
    }
  } catch (e) {
    alert('Analysis failed: ' + e.message)
  } finally {
    analyzing.value = false
  }
}

const openEmailModal = async (id) => {
  generatingEmail.value = true
  try {
    const payload = await store.generateApplicationEmail(id)
    emailSubject.value = payload.subject
    emailBody.value = payload.body
    showEmailModal.value = true
  } catch (e) {
    alert('Failed to generate application email: ' + e.message)
  } finally {
    generatingEmail.value = false
  }
}

const tailorResume = async (id) => {
  try {
    const result = await store.tailorResume(id)
    console.log('Tailored resume response:', result)
    
    // Extract the resume text from the response
    if (result && result.tailored_resume) {
      tailoredResume.value = result.tailored_resume
      tailoredDocumentId.value = result.document_id || null
    } else if (typeof result === 'string') {
      tailoredResume.value = result
      tailoredDocumentId.value = null
    } else {
      tailoredResume.value = 'Error: No resume content received'
      tailoredDocumentId.value = null
    }
    
    console.log('Final tailoredResume value:', tailoredResume.value)
    
    // Load original resume for comparison
    await getOriginalResume()
    
    showTailoredResumeModal.value = true
  } catch (e) {
    alert('Resume generation failed: ' + e.message)
  }
}

const handleResumeFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File too large. Maximum size is 10MB')
      return
    }
    
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/png', 'image/jpeg', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      alert('Unsupported file type. Please upload PDF, DOCX, PNG, JPG, or WebP')
      return
    }
    
    resumeFile.value = file
  }
}

const uploadResume = async () => {
  if (!resumeFile.value) return
  
  uploading.value = true
  try {
    const response = await authAPI.uploadMasterResume(resumeFile.value)
    alert(`Resume uploaded successfully! Extracted ${response.content_length} characters.`)
    showResumeModal.value = false
    resumeFile.value = null
  } catch (e) {
    alert('Resume upload failed: ' + e.message)
  } finally {
    uploading.value = false
  }
}

const exportMasterResume = async (format = 'pdf') => {
  downloadingMasterResume.value = true
  try {
    const response = await authAPI.exportMasterResume(format, 'ats')
    const blob = response.data
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    const extension = format === 'docx' ? 'docx' : 'pdf'
    link.download = `resume_ats.${extension}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch (e) {
    alert('Failed to download resume: ' + e.message)
  } finally {
    downloadingMasterResume.value = false
  }
}

const copyEmailToClipboard = async () => {
  if (!emailSubject.value && !emailBody.value) {
    alert('No email content to copy')
    return
  }
  const combined = `Subject: ${emailSubject.value}\n\n${emailBody.value}`
  try {
    await navigator.clipboard.writeText(combined)
    alert('Email copied to clipboard!')
  } catch (e) {
    alert('Failed to copy email: ' + e.message)
  }
}

const downloadTailoredResume = (format = 'pdf') => {
  console.log('Download clicked, format:', format, 'document id:', tailoredDocumentId.value)

  if (!tailoredDocumentId.value) {
    alert('No downloadable document available yet. Please re-generate the resume.')
    return
  }

  const fileExtension = format === 'docx' ? 'docx' : 'pdf'
  const fileName = `tailored_resume_ats.${fileExtension}`

  documentsAPI
    .downloadDocument(tailoredDocumentId.value, format, 'ats')
    .then((response) => {
      const blob = response.data
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    })
    .catch((e) => {
      console.error('Download failed:', e)
      alert('Download failed: ' + e.message)
    })
}

const copyTailoredResume = async () => {
  console.log('Copy clicked, resume value:', tailoredResume.value)
  
  if (!tailoredResume.value || tailoredResume.value.trim() === '') {
    alert('No resume content to copy!')
    return
  }
  
  try {
    await navigator.clipboard.writeText(tailoredResume.value)
    alert('Resume copied to clipboard!')
    console.log('Copy completed successfully')
  } catch (e) {
    console.error('Clipboard copy failed, trying fallback:', e)
    // Fallback for older browsers
    try {
      const textArea = document.createElement('textarea')
      textArea.value = tailoredResume.value
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      alert('Resume copied to clipboard!')
      console.log('Fallback copy completed successfully')
    } catch (fallbackError) {
      console.error('Fallback copy also failed:', fallbackError)
      alert('Copy failed: ' + fallbackError.message)
    }
  }
}

const getOriginalResume = async () => {
  try {
    originalResume.value = 'Loading original resume...'
    const response = await authAPI.getUserProfile()
    console.log('User profile response:', response)
    
    if (response.master_resume && response.master_resume.text) {
      // Format the extracted text to look more professional
      const formattedText = formatResumeText(response.master_resume.text)
      originalResume.value = formattedText
      return formattedText
    } else if (response.master_resume) {
      const resumeText = typeof response.master_resume === 'string' 
        ? response.master_resume 
        : JSON.stringify(response.master_resume, null, 2)
      const formattedText = formatResumeText(resumeText)
      originalResume.value = formattedText
      return formattedText
    } else {
      originalResume.value = 'No original resume found. Please upload your resume first.'
      return 'No original resume found. Please upload your resume first.'
    }
  } catch (e) {
    console.error('Failed to fetch original resume:', e)
    originalResume.value = 'Failed to load original resume'
    return 'Failed to load original resume'
  }
}

const formatResumeText = (rawText) => {
  if (!rawText) return 'No resume content found.'
  
  // Clean and format the text
  const lines = rawText.split('\n')
  const formattedLines = []
  
  for (const line of lines) {
    const trimmedLine = line.trim()
    if (!trimmedLine) continue
    
    // Detect headers (all caps or common resume sections)
    if (trimmedLine === trimmedLine.toUpperCase() && trimmedLine.length < 50) {
      formattedLines.push(`## ${trimmedLine}`)
    }
    // Detect contact info (email, phone, LinkedIn)
    else if (trimmedLine.includes('@') || trimmedLine.toLowerCase().includes('linkedin') || 
             trimmedLine.replace(/[-\s]/g, '').match(/^\d+$/)) {
      formattedLines.push(`**${trimmedLine}**`)
    }
    // Detect bullet points or work experience
    else if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-') || trimmedLine.startsWith('*')) {
      formattedLines.push(`• ${trimmedLine.substring(1).trim()}`)
    }
    // Detect dates
    else if (/(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i.test(trimmedLine)) {
      formattedLines.push(`**${trimmedLine}**`)
    }
    // Regular text
    else {
      formattedLines.push(trimmedLine)
    }
  }
  
  return formattedLines.join('\n\n')
}

const handleLogout = () => {
  localStorage.removeItem('access_token')
  router.push('/login')
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
