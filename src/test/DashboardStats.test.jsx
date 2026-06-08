import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import DashboardStats from '../components/Dashboard/DashboardStats'

vi.mock('../context/ProductContext', () => ({
  useProducts: () => ({
    products: [
      {
        id: 1,
        title: 'Product A',
        price: 29.99,
        category: 'electronics',
        rating: { rate: 4.5, count: 120 },
      },
      {
        id: 2,
        title: 'Product B',
        price: 9.99,
        category: 'clothing',
        rating: { rate: 3.2, count: 80 },
      },
    ],
    loading: false,
  }),
}))

describe('DashboardStats', () => {
  it('renders all stat card labels', () => {
    render(<DashboardStats />)

    expect(screen.getByText('Total Products')).toBeInTheDocument()
    expect(screen.getByText('Categories')).toBeInTheDocument()
    expect(screen.getByText('Avg. Price')).toBeInTheDocument()
    expect(screen.getByText('Total Reviews')).toBeInTheDocument()
    expect(screen.getByText('Avg. Rating')).toBeInTheDocument()
  })

  it('renders correct computed values', () => {
    render(<DashboardStats />)

    const twos = screen.getAllByText('2')
    expect(twos).toHaveLength(2)

    expect(screen.getByText('$19.99')).toBeInTheDocument()
    expect(screen.getByText('200')).toBeInTheDocument()
    expect(screen.getByText('3.9')).toBeInTheDocument()
  })
})
