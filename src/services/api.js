// src/services/api.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const fetchHello = async () => {
  const response = await fetch(`${API_BASE_URL}/api/hello`);
  return await response.json();
};