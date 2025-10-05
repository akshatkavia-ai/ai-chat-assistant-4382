import axios from 'axios';

/**
 * Get the backend URL from environment variables
 * Tries REACT_APP_BACKEND_URL first, then falls back to REACT_APP_API_BASE_URL
 * @returns {string} The backend API base URL
 */
// PUBLIC_INTERFACE
const getBackendUrl = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_API_BASE_URL;
  
  if (!backendUrl) {
    console.warn('No backend URL configured. Using default: http://localhost:3001');
    return 'http://localhost:3001';
  }
  
  return backendUrl;
};

/**
 * Axios instance configured with backend base URL
 */
const apiClient = axios.create({
  baseURL: getBackendUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

/**
 * Request interceptor for logging and error handling
 */
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

/**
 * Response interceptor for error handling
 */
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('API Error Response:', error.response.status, error.response.data);
    } else if (error.request) {
      // Request made but no response received
      console.error('API No Response:', error.request);
    } else {
      // Error in request setup
      console.error('API Request Setup Error:', error.message);
    }
    return Promise.reject(error);
  }
);

/**
 * Send a chat message to the backend
 * @param {string} message - The user's message
 * @param {string|null} conversationId - Optional conversation ID to continue existing conversation
 * @returns {Promise<Object>} Response with assistant reply and conversation_id
 */
// PUBLIC_INTERFACE
export const sendChatMessage = async (message, conversationId = null) => {
  try {
    const payload = {
      message,
      ...(conversationId && { conversation_id: conversationId }),
    };
    
    const response = await apiClient.post('/chat', payload);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.detail || 
      error.message || 
      'Failed to send message'
    );
  }
};

/**
 * Get conversation history for a specific conversation ID
 * @param {string} conversationId - The conversation ID
 * @returns {Promise<Object>} Conversation history with messages array
 */
// PUBLIC_INTERFACE
export const getConversationHistory = async (conversationId) => {
  try {
    const response = await apiClient.get('/history', {
      params: { conversation_id: conversationId },
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      // Conversation not found, return empty
      return { conversation_id: conversationId, messages: [] };
    }
    throw new Error(
      error.response?.data?.detail || 
      error.message || 
      'Failed to fetch conversation history'
    );
  }
};

/**
 * Get list of all conversations
 * @returns {Promise<Array>} Array of conversation IDs
 */
// PUBLIC_INTERFACE
export const listConversations = async () => {
  try {
    const response = await apiClient.get('/conversations');
    return response.data.conversations || [];
  } catch (error) {
    console.error('Failed to fetch conversations:', error);
    // Return empty array if endpoint not available or fails
    return [];
  }
};

/**
 * Health check endpoint
 * @returns {Promise<Object>} Health status
 */
// PUBLIC_INTERFACE
export const checkHealth = async () => {
  try {
    const response = await apiClient.get('/health');
    return response.data;
  } catch (error) {
    throw new Error('Backend service is not available');
  }
};

export default apiClient;
