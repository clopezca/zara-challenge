import { render, screen } from '@testing-library/react'
import ProductSpecs from './ProductSpecs'

const mockSpecs = {
  screen: '6.8" Dynamic AMOLED 2X',
  resolution: '3120 x 1440 pixels',
  processor: 'Snapdragon 8 Gen 3',
  mainCamera: '200 MP',
  selfieCamera: '12 MP',
  battery: '5000 mAh',
  os: 'Android 14',
  screenRefreshRate: '120 Hz',
}

describe('ProductSpecs', () => {
  beforeEach(() => {
    render(
      <ProductSpecs
        brand="Samsung"
        name="Galaxy S24 Ultra"
        description="El Samsung Galaxy S24 Ultra es un smartphone de gama alta con una pantalla Dynamic AMOLED 2X de 6.8 pulgadas, procesador Qualcomm Snapdragon 8 Gen 3 for Galaxy, y un avanzado sistema de cámara con inteligencia artificial."
        specs={mockSpecs}
      />
    )
  })

  it('should render the title', () => {
    expect(screen.getByText('specifications')).toBeInTheDocument()
  })

  it('should render brand and name', () => {
    expect(screen.getByText('Samsung')).toBeInTheDocument()
    expect(screen.getByText('Galaxy S24 Ultra')).toBeInTheDocument()
  })

  it('should render all specs', () => {
    expect(screen.getByText('6.8" Dynamic AMOLED 2X')).toBeInTheDocument()
    expect(screen.getByText('5000 mAh')).toBeInTheDocument()
    expect(screen.getByText('Android 14')).toBeInTheDocument()
  })

  it('should render description', () => {
    expect(
      screen.getByText(
        'El Samsung Galaxy S24 Ultra es un smartphone de gama alta con una pantalla Dynamic AMOLED 2X de 6.8 pulgadas, procesador Qualcomm Snapdragon 8 Gen 3 for Galaxy, y un avanzado sistema de cámara con inteligencia artificial.'
      )
    ).toBeInTheDocument()
  })
})
