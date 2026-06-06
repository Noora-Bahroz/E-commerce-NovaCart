import { describe, it, expect } from 'vitest'
import { validateEmail, validatePassword } from '../utils/validators'

describe('validateEmail', () => {
  it('returns error for empty email', () => {
    expect(validateEmail('')).toBe('Email is required')
  })

  it('returns error for invalid email', () => {
    expect(validateEmail('notanemail')).toBe('Invalid email address')
    expect(validateEmail('@domain.com')).toBe('Invalid email address')
    expect(validateEmail('user@')).toBe('Invalid email address')
  })

  it('returns empty string for valid email', () => {
    expect(validateEmail('user@example.com')).toBe('')
    expect(validateEmail('test@domain.co')).toBe('')
  })
})

describe('validatePassword', () => {
  it('returns error for empty password', () => {
    expect(validatePassword('')).toBe('Password is required')
  })

  it('returns error for short password', () => {
    expect(validatePassword('abc12')).toBe('Password must be at least 6 characters')
  })

  it('returns empty string for valid password', () => {
    expect(validatePassword('abcdef')).toBe('')
    expect(validatePassword('longpassword123')).toBe('')
  })
})
