async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const response = await fetch(url, {
    ...options,
    credentials: 'include', // Important for sending cookies
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    // Handle authentication errors
    if (response.status === 401) {
      // Redirect to login or refresh token
      window.location.href = '/login';
      return;
    }
    throw new Error('API request failed');
  }

  return response.json();
}
