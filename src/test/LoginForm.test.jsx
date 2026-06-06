import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuthProvider } from '../context/AuthContext'
import LoginForm from '../components/Auth/LoginForm'

function renderLoginForm() {
  return render(
    <AuthProvider>
      <LoginForm />
    </AuthProvider>
  )
}

describe('LoginForm', () => {
  it('renders email and password fields', () => {
    renderLoginForm()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('shows validation errors on empty submit', async () => {
    const user = userEvent.setup()
    renderLoginForm()

    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(screen.getByText(/email is required/i)).toBeInTheDocument()
    expect(screen.getByText(/password is required/i)).toBeInTheDocument()
  })

  it('shows email validation error for invalid email', async () => {
    const user = userEvent.setup()
    renderLoginForm()

    await user.type(screen.getByLabelText(/email/i), 'bad-email')
    await user.type(screen.getByLabelText(/password/i), 'validpass')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(screen.getByText(/invalid email/i)).toBeInTheDocument()
  })

  it('shows password validation for short password', async () => {
    const user = userEvent.setup()
    renderLoginForm()

    await user.type(screen.getByLabelText(/email/i), 'user@example.com')
    await user.type(screen.getByLabelText(/password/i), 'abc')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(screen.getByText(/at least 6 characters/i)).toBeInTheDocument()
  })

  it('shows success on valid submission', async () => {
    const user = userEvent.setup()
    renderLoginForm()

    await user.type(screen.getByLabelText(/email/i), 'user@example.com')
    await user.type(screen.getByLabelText(/password/i), 'validpass')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(screen.getByText(/login successful/i)).toBeInTheDocument()
  })
})
