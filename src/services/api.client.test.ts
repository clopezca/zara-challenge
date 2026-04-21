import { apiClient } from './api.client'

describe('apiClient', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('should return data when response is ok', async () => {
    const mockData = { id: '1', name: 'Test' }
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    } as Response)

    const result = await apiClient('/products')

    expect(result).toEqual(mockData)
  })

  it('should throw "Product not found" on 404', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 404,
    } as Response)

    await expect(apiClient('/products/invalid')).rejects.toThrow('Product not found')
  })

  it('should throw "Server error" on 500', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 500,
    } as Response)

    await expect(apiClient('/products')).rejects.toThrow('Server error. Please try again later.')
  })

  it('should throw generic error for other status codes', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 400,
    } as Response)

    await expect(apiClient('/products')).rejects.toThrow(
      'Something went wrong. Please try again later.'
    )
  })
})
