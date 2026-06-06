import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { validateEmail, validatePassword } from '../../utils/validators'

export default function LoginForm() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const emailErr = validateEmail(email)
    const passErr = validatePassword(password)
    setErrors({ email: emailErr, password: passErr })

    if (!emailErr && !passErr) {
      login(email, password)
      setSubmitted(true)
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate>
      <h1>Sign In</h1>
      {submitted && (
        <div className="success-message" role="status">
          Login successful! Redirecting...
        </div>
      )}

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          placeholder="user@example.com"
        />
        {errors.email && (
          <span id="email-error" className="field-error" role="alert">
            {errors.email}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? 'password-error' : undefined}
          placeholder="At least 6 characters"
        />
        {errors.password && (
          <span id="password-error" className="field-error" role="alert">
            {errors.password}
          </span>
        )}
      </div>

      <button type="submit">Sign In</button>
    </form>
  )
}
