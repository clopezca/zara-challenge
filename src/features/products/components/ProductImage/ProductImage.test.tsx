import { render, screen } from '@testing-library/react'
import ProductImage from './ProductImage'

describe('ProductImage', () => {
  it('should render the image with correct src and alt', () => {
    render(<ProductImage imageUrl="http://example.com/image.webp" name="Galaxy S24 Ultra" />)
    const img = screen.getByRole('img', { name: 'Galaxy S24 Ultra' })

    expect(img).toHaveAttribute('src', 'http://example.com/image.webp')
  })
})
