<template>
  <div class="job-card bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <!-- Header -->
    <div class="flex justify-between items-start mb-4">
      <div class="flex-1">
        <h3 class="text-xl font-semibold text-gray-900 mb-1">
          {{ application.job_title }}
        </h3>
        <p class="text-gray-600 mb-2">{{ application.company_name }}</p>
        <div class="flex items-center gap-4 text-sm text-gray-500">
          <span v-if="application.location" class="flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {{ application.location }}
          </span>
          <span v-if="application.remote_type" class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
            {{ application.remote_type }}
          </span>
        </div>
      </div>
      
      <!-- Status Badge -->
      <span :class="statusClass" class="px-3 py-1 rounded-full text-sm font-medium">
        {{ application.status }}
      </span>
    </div>

    <!-- Match Score -->
    <div v-if="application.match_score !== null" class="mb-4">
      <div class="flex justify-between items-center mb-2">
        <span class="text-sm font-medium text-gray-700">Match Score</span>
        <span class="text-sm font-bold" :class="scoreColor">
          {{ application.match_score }}%
        </span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div 
          :class="scoreBarColor"
          class="h-2 rounded-full transition-all"
          :style="{ width: `${application.match_score}%` }"
        ></div>
      </div>
    </div>

    <!-- AI Analysis Summary -->
    <div v-if="application.ai_analysis" class="mb-4 p-3 bg-gray-50 rounded">
      <p class="text-sm text-gray-700 mb-2">
        <span class="font-medium">Strengths:</span> 
        {{ application.ai_analysis.strengths?.slice(0, 2).join(', ') || 'N/A' }}
      </p>
      <p v-if="application.missing_keywords?.length" class="text-sm text-gray-700">
        <span class="font-medium">Missing Keywords:</span> 
        {{ application.missing_keywords.slice(0, 3).join(', ') }}
        <span v-if="application.missing_keywords.length > 3">...</span>
      </p>
    </div>

    <!-- Salary -->
    <div v-if="application.salary_range" class="mb-4 text-sm text-gray-600">
      <span class="font-medium">Salary:</span> {{ application.salary_range }}
    </div>

    <!-- Actions -->
    <div class="flex gap-2 mt-4">
      <button 
        @click="$emit('view', application.id)"
        class="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium"
      >
        View Details
      </button>
      
      <button 
        v-if="application.status === 'PENDING'"
        @click="$emit('analyze', application.id)"
        class="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm font-medium"
      >
        Analyze
      </button>
      
      <button 
        v-if="application.status === 'ANALYZED'"
        @click="$emit('tailor', application.id)"
        class="flex-1 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors text-sm font-medium"
      >
        Tailor Resume
      </button>
    </div>

    <!-- Timestamp -->
    <div class="mt-4 text-xs text-gray-400">
      Added {{ formatDate(application.created_at) }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  application: {
    type: Object,
    required: true
  }
})

defineEmits(['view', 'analyze', 'tailor'])

const statusClass = computed(() => {
  const statusMap = {
    'PENDING': 'bg-yellow-100 text-yellow-800',
    'ANALYZED': 'bg-blue-100 text-blue-800',
    'APPLIED': 'bg-green-100 text-green-800',
    'REJECTED': 'bg-red-100 text-red-800',
    'WITHDRAWN': 'bg-gray-100 text-gray-800'
  }
  return statusMap[props.application.status] || 'bg-gray-100 text-gray-800'
})

const scoreColor = computed(() => {
  const score = props.application.match_score
  if (score >= 80) return 'text-green-600'
  if (score >= 60) return 'text-blue-600'
  if (score >= 40) return 'text-yellow-600'
  return 'text-red-600'
})

const scoreBarColor = computed(() => {
  const score = props.application.match_score
  if (score >= 80) return 'bg-green-500'
  if (score >= 60) return 'bg-blue-500'
  if (score >= 40) return 'bg-yellow-500'
  return 'bg-red-500'
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'today'
  if (diffDays === 1) return 'yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  return date.toLocaleDateString()
}
</script>

<style scoped>
.job-card {
  transition: all 0.3s ease;
}

.job-card:hover {
  transform: translateY(-2px);
}
</style>
