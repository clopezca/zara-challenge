const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY

if (!API_URL || !API_KEY) {
  throw new Error('Missing required environment variables: VITE_API_URL, VITE_API_KEY')
}

export const apiClient = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'x-api-key': API_KEY,
    },
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }

  return response.json()
}
