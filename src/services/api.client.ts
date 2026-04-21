const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY

if (!API_URL || !API_KEY) {
  throw new Error('Missing required environment variables: VITE_API_URL, VITE_API_KEY')
}

export const apiClient = async <T>(endpoint: string, signal?: AbortSignal): Promise<T> => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'x-api-key': API_KEY,
    },
    signal,
  })

  if (!response.ok) {
    if (response.status === 404) throw new Error('Product not found')
    if (response.status >= 500) throw new Error('Server error. Please try again later.')
    throw new Error('Something went wrong. Please try again later.')
  }

  return response.json()
}
