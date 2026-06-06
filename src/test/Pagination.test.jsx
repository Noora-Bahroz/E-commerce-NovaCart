import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Pagination from '../components/Products/Pagination'

describe('Pagination', () => {
  it('renders nothing when totalPages is 1', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders page buttons', () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />
    )

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByLabelText(/previous/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/next/i)).toBeInTheDocument()
  })

  it('highlights current page', () => {
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={() => {}} />
    )

    expect(screen.getByText('3')).toHaveAttribute('aria-current', 'page')
  })

  it('disables prev on first page', () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />
    )

    expect(screen.getByLabelText(/previous/i)).toBeDisabled()
  })

  it('disables next on last page', () => {
    render(
      <Pagination currentPage={5} totalPages={5} onPageChange={() => {}} />
    )

    expect(screen.getByLabelText(/next/i)).toBeDisabled()
  })

  it('calls onPageChange when clicking a page', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />
    )

    await user.click(screen.getByText('2'))
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('shows ellipsis for large page ranges', () => {
    render(
      <Pagination currentPage={5} totalPages={20} onPageChange={() => {}} />
    )

    const ellipses = screen.getAllByText('...')
    expect(ellipses.length).toBe(2)
  })
})
