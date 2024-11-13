import axios from 'axios';

// Create an Axios instance with the base configuration
const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,  // Make sure to set this environment variable in your .env file
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token if available
API.interceptors.request.use(
  (config) => {
    // Retrieve token from local storage or another source if required
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response interceptor for handling responses and errors globally
API.interceptors.response.use(
  (response) => {
    // Handle successful response
    return response;
  },
  (error) => {
    // Check for specific error codes (e.g., 401 Unauthorized)
    if (error.response && error.response.status === 401) {
      // Optionally handle logout or token refresh
      console.log('Unauthorized access - please log in again');
      // Redirect to login or refresh token logic if required
    } else if (error.response && error.response.status === 405) {
      console.log('Method Not Allowed');
    }
    // Log and reject the error for further handling in components
    return Promise.reject(error);
  }
);

// Helper method to make POST requests
const postData = (url, data) => {
  return API.post(url, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error during POST request:', error);
      throw error;
    });
};

// Helper method to make GET requests
const getData = (url) => {
  return API.get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error during GET request:', error);
      throw error;
    });
};

// Helper method for other HTTP methods if needed
const putData = (url, data) => {
  return API.put(url, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error during PUT request:', error);
      throw error;
    });
};

const deleteData = (url) => {
  return API.delete(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error during DELETE request:', error);
      throw error;
    });
};

export { postData, getData, putData, deleteData };
export default API;
