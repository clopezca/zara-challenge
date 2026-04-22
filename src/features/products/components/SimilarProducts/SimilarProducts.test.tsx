import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SimilarProducts from './SimilarProducts'

const mockProducts = [
  {
    id: 'APL-I15PM',
    brand: 'Apple',
    name: 'iPhone 15 Pro Max',
    basePrice: 1319,
    imageUrl: 'http://example.com/image.webp',
  },
  {
    id: 'SMG-S24U',
    brand: 'Samsung',
    name: 'Galaxy S24 Ultra',
    basePrice: 1329,
    imageUrl: 'http://example.com/image2.webp',
  },
]

describe('SimilarProducts', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <SimilarProducts products={mockProducts} />
      </MemoryRouter>
    )
  })

  it('should render the title', () => {
    expect(screen.getByRole('heading', { name: /similar items/i })).toBeInTheDocument()
  })

  it('should render all similar products', () => {
    expect(screen.getByRole('link', { name: /apple iphone 15 pro max/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /samsung galaxy s24 ultra/i })).toBeInTheDocument()
  })

  it('should render correct number of products', () => {
    expect(screen.getAllByRole('article')).toHaveLength(2)
  })

  it('should update scroll progress when list is scrolled', () => {
    cleanup()

    render(
      <MemoryRouter>
        <SimilarProducts products={mockProducts} />
      </MemoryRouter>
    )

    const list = screen.getByRole('list', { name: /similar products list/i })

    Object.defineProperty(list, 'scrollLeft', { value: 100, configurable: true })
    Object.defineProperty(list, 'scrollWidth', { value: 500, configurable: true })
    Object.defineProperty(list, 'clientWidth', { value: 300, configurable: true })

    fireEvent.scroll(list)

    const progressbar = screen.getByRole('progressbar')
    expect(progressbar).toHaveAttribute('aria-valuenow', '50')
  })
})
