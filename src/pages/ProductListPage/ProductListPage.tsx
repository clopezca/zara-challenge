import { useState } from 'react'

import { useProducts } from '../../features/products/hooks/useProducts'
import { useDebounce } from '../../hooks/useDebounce'

import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import ProductGrid from '../../features/products/components/ProductGrid/ProductGrid'

import styles from './ProductListPage.module.scss'
import SearchInput from '../../features/products/components/SearchInput/SearchInput'

const ProductListPage = () => {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)
  const { products, error } = useProducts(debouncedSearch)

  if (error) return <ErrorMessage message={error} />

  return (
    <main className={styles.page}>
      <SearchInput value={search} onChange={setSearch} resultsCount={products.length} />
      <ProductGrid products={products} />
    </main>
  )
}

export default ProductListPage
