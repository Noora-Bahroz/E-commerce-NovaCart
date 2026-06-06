import { Navigate } from 'react-router-dom'
import LoginForm from '../components/Auth/LoginForm'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) return <Navigate to="/dashboard" replace />

  return (
    <div className="login-page">
      <LoginForm />
    </div>
  )
}
