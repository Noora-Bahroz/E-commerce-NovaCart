import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import EmptyState from '../components/common/EmptyState'

describe('EmptyState', () => {
  it('renders default message', () => {
    render(<EmptyState />)
    expect(screen.getByText(/no products found/i)).toBeInTheDocument()
  })

  it('renders custom message', () => {
    render(<EmptyState message="Nothing to show" />)
    expect(screen.getByText(/nothing to show/i)).toBeInTheDocument()
  })
})
