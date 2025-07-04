import API_BASE_URL from '../utils/config';

export const useApi = () => {
  const request = async (endpoint, method = 'GET', body = null, token = null) => {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    const data = await res.json();
    return { status: res.status, data };
  };

  return { request };
};
