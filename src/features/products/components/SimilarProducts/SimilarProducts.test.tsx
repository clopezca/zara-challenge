import { render, screen } from '@testing-library/react'
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
    expect(screen.getByText('similar items')).toBeInTheDocument()
  })

  it('should render all similar products', () => {
    expect(screen.getByText('iPhone 15 Pro Max')).toBeInTheDocument()
    expect(screen.getByText('Galaxy S24 Ultra')).toBeInTheDocument()
  })

  it('should render correct number of products', () => {
    expect(screen.getAllByRole('article')).toHaveLength(2)
  })
})
