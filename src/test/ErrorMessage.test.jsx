import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ErrorMessage from '../components/common/ErrorMessage'

describe('ErrorMessage', () => {
  it('renders error message', () => {
    render(<ErrorMessage message="Network error" />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText(/network error/i)).toBeInTheDocument()
  })

  it('renders retry button and calls onRetry', async () => {
    const user = userEvent.setup()
    const onRetry = vi.fn()
    render(<ErrorMessage message="Failed" onRetry={onRetry} />)

    const btn = screen.getByRole('button', { name: /retry/i })
    expect(btn).toBeInTheDocument()

    await user.click(btn)
    expect(onRetry).toHaveBeenCalledOnce()
  })

  it('does not render retry button when onRetry is not provided', () => {
    render(<ErrorMessage message="Failed" />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
