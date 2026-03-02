<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4">
    <div class="max-w-md w-full">
      <!-- Logo and Title -->
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 class="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          SamsCloak
        </h1>
        <p class="text-gray-600 mt-2">AI-Powered Job Application Assistant</p>
      </div>

      <!-- Auth Card -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <!-- Tabs -->
        <div class="flex space-x-4 mb-6">
          <button
            @click="activeTab = 'login'"
            :class="[
              'flex-1 py-2 px-4 rounded-lg font-medium transition-colors',
              activeTab === 'login'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            ]"
          >
            Login
          </button>
          <button
            @click="activeTab = 'register'"
            :class="[
              'flex-1 py-2 px-4 rounded-lg font-medium transition-colors',
              activeTab === 'register'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            ]"
          >
            Register
          </button>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded">
          <p class="text-red-700 text-sm">{{ error }}</p>
        </div>

        <!-- Success Message -->
        <div v-if="success" class="mb-4 p-4 bg-green-50 border-l-4 border-green-500 rounded">
          <p class="text-green-700 text-sm">{{ success }}</p>
        </div>

        <!-- Login Form -->
        <form v-if="activeTab === 'login'" @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              v-model="loginForm.email"
              type="email"
              required
              placeholder="you@example.com"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div class="relative">
              <input
                v-model="loginForm.password"
                :type="showLoginPassword ? 'text' : 'password'"
                required
                placeholder="••••••••"
                class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
              <button
                type="button"
                @click="showLoginPassword = !showLoginPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg v-if="showLoginPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>
        </form>

        <!-- Register Form -->
        <form v-if="activeTab === 'register'" @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              v-model="registerForm.full_name"
              type="text"
              required
              placeholder="John Doe"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              v-model="registerForm.email"
              type="email"
              required
              placeholder="you@example.com"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div class="relative">
              <input
                v-model="registerForm.password"
                :type="showRegisterPassword ? 'text' : 'password'"
                required
                minlength="8"
                maxlength="72"
                placeholder="••••••••"
                class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                :class="{ 'border-red-500': passwordError }"
                @input="validatePassword"
              />
              <button
                type="button"
                @click="showRegisterPassword = !showRegisterPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg v-if="showRegisterPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
            <p class="text-xs text-gray-500 mt-1">Minimum 8 characters, maximum 72 characters</p>
            <p v-if="passwordError" class="text-xs text-red-500 mt-1">{{ passwordError }}</p>
            <!-- Password strength indicator -->
            <div class="mt-2">
              <div class="flex items-center justify-between mb-1">
                <span class="text-xs text-gray-500">Password strength:</span>
                <span class="text-xs" :class="passwordStrengthColor">{{ passwordStrengthText }}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-1.5">
                <div class="h-1.5 rounded-full transition-all" :class="passwordStrengthColor.replace('text', 'bg')" :style="{ width: passwordStrengthWidth }"></div>
              </div>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <div class="relative">
              <input
                v-model="registerForm.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                required
                placeholder="••••••••"
                class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg v-if="showConfirmPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Creating account...' : 'Create Account' }}
          </button>
        </form>
      </div>

      <!-- Footer -->
      <p class="text-center text-gray-600 text-sm mt-6">
        By continuing, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { authAPI } from '../services/api'

const router = useRouter()
const activeTab = ref('login')
const loading = ref(false)
const error = ref(null)
const success = ref(null)

const loginForm = ref({
  email: '',
  password: ''
})

const registerForm = ref({
  full_name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const passwordError = ref(null)
const passwordStrength = ref(0)

// Password visibility toggles
const showLoginPassword = ref(false)
const showRegisterPassword = ref(false)
const showConfirmPassword = ref(false)

const validatePassword = () => {
  const password = registerForm.value.password
  passwordError.value = null
  
  if (password.length < 8) {
    passwordError.value = 'Password must be at least 8 characters'
    return false
  }
  
  if (password.length > 72) {
    passwordError.value = 'Password cannot exceed 72 characters'
    return false
  }
  
  // Check for common patterns
  if (password.toLowerCase() === 'password' || password.toLowerCase() === '12345678') {
    passwordError.value = 'Password is too common'
    return false
  }
  
  return true
}

const calculatePasswordStrength = () => {
  const password = registerForm.value.password
  let strength = 0
  
  if (password.length >= 8) strength += 20
  if (password.length >= 12) strength += 20
  if (/[a-z]/.test(password)) strength += 20
  if (/[A-Z]/.test(password)) strength += 20
  if (/[0-9]/.test(password)) strength += 10
  if (/[^a-zA-Z0-9]/.test(password)) strength += 10
  
  return Math.min(strength, 100)
}

const passwordStrengthText = computed(() => {
  const strength = calculatePasswordStrength()
  if (strength < 30) return 'Weak'
  if (strength < 60) return 'Fair'
  if (strength < 80) return 'Good'
  return 'Strong'
})

const passwordStrengthColor = computed(() => {
  const strength = calculatePasswordStrength()
  if (strength < 30) return 'text-red-500'
  if (strength < 60) return 'text-yellow-500'
  if (strength < 80) return 'text-blue-500'
  return 'text-green-500'
})

const passwordStrengthWidth = computed(() => {
  return calculatePasswordStrength() + '%'
})

const handleLogin = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await authAPI.login(loginForm.value.email, loginForm.value.password)
    success.value = 'Login successful! Redirecting...'
    
    setTimeout(() => {
      router.push('/')
    }, 1000)
  } catch (e) {
    error.value = e.response?.data?.detail || 'Login failed. Please check your credentials.'
  } finally {
    loading.value = false
  }
}

const handleRegister = async () => {
  loading.value = true
  error.value = null
  success.value = null
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(registerForm.value.email)) {
    error.value = 'Please enter a valid email address'
    loading.value = false
    return
  }
  
  // Validate password
  if (!validatePassword()) {
    loading.value = false
    return
  }
  
  // Validate passwords match
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    error.value = 'Passwords do not match'
    loading.value = false
    return
  }
  
  // Validate name
  if (registerForm.value.full_name.trim().length < 2) {
    error.value = 'Please enter your full name'
    loading.value = false
    return
  }
  
  try {
    await authAPI.register({
      email: registerForm.value.email.toLowerCase().trim(),
      password: registerForm.value.password,
      full_name: registerForm.value.full_name.trim()
    })
    
    success.value = 'Account created! Please login.'
    activeTab.value = 'login'
    loginForm.value.email = registerForm.value.email
    
    // Reset register form
    registerForm.value = {
      full_name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
    passwordError.value = null
  } catch (e) {
    if (e.response?.status === 409) {
      error.value = 'Email already registered. Please use a different email.'
    } else if (e.response?.data?.detail) {
      error.value = e.response.data.detail
    } else {
      error.value = 'Registration failed. Please try again.'
    }
  } finally {
    loading.value = false
  }
}
</script>
