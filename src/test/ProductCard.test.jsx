import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProductCard from '../components/Products/ProductCard'

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 29.99,
  category: 'electronics',
  description: 'A great product',
  image: 'https://via.placeholder.com/150',
  rating: { rate: 4.5, count: 120 },
}

describe('ProductCard', () => {
  it('renders product details', () => {
    render(<ProductCard product={mockProduct} />)

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('electronics')).toBeInTheDocument()
    expect(screen.getByText('$29.99')).toBeInTheDocument()
    expect(screen.getByText('(120)')).toBeInTheDocument()
  })

  it('renders image with correct alt text', () => {
    render(<ProductCard product={mockProduct} />)

    const img = screen.getByAltText('Test Product')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'https://via.placeholder.com/150')
  })

  it('handles product with no rating gracefully', () => {
    const noRating = { ...mockProduct, rating: undefined }
    render(<ProductCard product={noRating} />)

    expect(screen.getByText('Test Product')).toBeInTheDocument()
  })

  it('renders rating stars', () => {
    render(<ProductCard product={mockProduct} />)

    const ratingEl = screen.getByText(/★/i)
    expect(ratingEl).toBeInTheDocument()
  })
})
