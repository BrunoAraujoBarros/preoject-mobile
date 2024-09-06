import axios from 'axios';

export const login = async (userId, password) => {
  try {
    const response = await axios.post('/auth/login', { userId, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao fazer login');
  }
};
