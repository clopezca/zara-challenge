import { renderHook, act } from '@testing-library/react'
import { useDebounce } from './useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('samsung', 300))

    expect(result.current).toBe('samsung')
  })

  it('should not update value before delay has passed', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'samsung' },
    })

    rerender({ value: 'apple' })

    expect(result.current).toBe('samsung')
  })

  it('should update value after delay has passed', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'samsung' },
    })

    rerender({ value: 'apple' })

    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(result.current).toBe('apple')
  })
})
