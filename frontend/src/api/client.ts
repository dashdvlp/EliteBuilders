import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Handle FormData content type
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  }
  
  return config;
});

// API endpoints
export const api = {
  // Auth
  login: (email: string) => apiClient.post('/auth/login', { email }),
  loginWithOAuth: (provider: 'google' | 'github', code: string) => 
    apiClient.post(`/auth/${provider}/callback`, { code }),
  logout: () => apiClient.post('/auth/logout'),
  
  // Profile
  updateUserProfile: (userId: string, data: any) => {
    // If data is FormData, it will be sent as multipart/form-data
    // Otherwise, it will be sent as JSON
    return apiClient.patch(`/users/${userId}/profile`, data);
  },
  
  // Challenges
  getChallenges: () => apiClient.get('/challenges'),
  getChallenge: (id: string) => apiClient.get(`/challenges/${id}`),
  submitChallenge: (challengeId: string, data: any) => 
    apiClient.post(`/challenges/${challengeId}/submit`, data),
  getLeaderboard: (challengeId: string) => 
    apiClient.get(`/challenges/${challengeId}/leaderboard`),
  
  // Users
  getUserProfile: (userId: string) => apiClient.get(`/users/${userId}`),
};

// Error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors (401, 403, etc.)
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
); 