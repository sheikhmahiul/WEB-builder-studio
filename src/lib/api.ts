const API_URL = 'http://localhost:8000/api';

async function request(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem('auth_token');
  const headers = new Headers(options.headers || {});

  headers.set('Accept', 'application/json');
  if (!(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed with status ${response.status}`);
  }

  return response.json();
}

export const api = {
  get: (path: string, options?: RequestInit) => request(path, { ...options, method: 'GET' }),
  post: (path: string, body: any, options?: RequestInit) =>
    request(path, {
      ...options,
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),
  put: (path: string, body: any, options?: RequestInit) =>
    request(path, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    }),
  patch: (path: string, body: any, options?: RequestInit) =>
    request(path, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    }),
  delete: (path: string, options?: RequestInit) => request(path, { ...options, method: 'DELETE' }),
};
