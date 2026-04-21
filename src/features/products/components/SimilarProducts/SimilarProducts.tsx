import { useEffect, useRef, useState } from 'react'
import type { Product } from '../../../../types/product.types'
import ProductCard from '../ProductCard/ProductCard'

import styles from './SimilarProducts.module.scss'

interface SimilarProductsProps {
  products: Product[]
}

const SimilarProducts = ({ products }: SimilarProductsProps) => {
  const listRef = useRef<HTMLUListElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [trackWidth, setTrackWidth] = useState(0)

  useEffect(() => {
    if (trackRef.current) {
      setTrackWidth(trackRef.current.clientWidth)
    }
  }, [])

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollLeft = 0
    }
  }, [products])

  const handleScroll = () => {
    if (!listRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = listRef.current
    const maxScroll = scrollWidth - clientWidth
    const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0
    setScrollProgress(progress)
  }

  return (
    <section className={styles.wrapper} aria-label="Similar products">
      <h2 className={styles.title}>similar items</h2>
      <ul
        className={styles.list}
        ref={listRef}
        onScroll={handleScroll}
        aria-label="Similar products list"
      >
        {products.map((product) => (
          <li key={product.id} className={styles.item}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
      <div
        className={styles.scrollTrack}
        ref={trackRef}
        role="progressbar"
        aria-label="Scroll progress"
        aria-valuenow={Math.round(scrollProgress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={styles.scrollThumb}
          style={{
            transform: `translateX(calc(${scrollProgress} * (${trackWidth}px - 100px)))`,
          }}
        />
      </div>
    </section>
  )
}

export default SimilarProducts
