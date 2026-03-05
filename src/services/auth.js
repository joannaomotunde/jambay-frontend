import axios from 'axios'

const API = axios.create({
  baseURL: 'https://jambay-backend.onrender.com/api/v1/user',
})
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)

export const registerUser = async (userData) => {
  const response = await API.post('/register', userData)
  return response.data
}

export const verifyOTP = async (data) => {
  const response = await API.post('/verify-otp', data)
  return response.data
}

export const loginUser = async (data) => {
  const response = await API.post('/login', data)
  return response.data
}

export const requestOTP = async (data) => {
  const response = await API.post('/request-otp', data)
  return response.data
}

export const resetPassword = async (data) => {
  const response = await API.post('/reset-password', data)
  return response.data
}
export const updateProfile = async (data) => {
  const response = await API.patch('/update-profile', data)
  return response.data
}