export interface ProductBase {
  id: string
  brand: string
  name: string
  basePrice: number
}

export interface Product extends ProductBase {
  imageUrl: string
}

export interface ProductSpecs {
  screen: string
  resolution: string
  processor: string
  mainCamera: string
  selfieCamera: string
  battery: string
  os: string
  screenRefreshRate: string
}

export interface ColorOption {
  name: string
  hexCode: string
  imageUrl: string
}

export interface StorageOption {
  capacity: string
  price: number
}

export interface ProductDetail extends ProductBase {
  description: string
  rating: number
  specs: ProductSpecs
  colorOptions: ColorOption[]
  storageOptions: StorageOption[]
  similarProducts: Product[]
}
