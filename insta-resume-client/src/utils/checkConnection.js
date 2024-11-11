import api from '../services/api';

export const checkConnection = async () => {
  try {
    const response = await api.get('/health');
    console.log('Server connection status:', response.data);
    return true;
  } catch (error) {
    console.error('Server connection error:', error);
    return false;
  }
}; 