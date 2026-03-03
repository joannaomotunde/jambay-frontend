import axios from 'axios'

const API = axios.create({
  baseURL: 'https://jambay-backend.onrender.com/api/v1/user',
})

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