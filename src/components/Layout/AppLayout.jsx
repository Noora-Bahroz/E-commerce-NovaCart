import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import LoadingSpinner from '../common/LoadingSpinner'

export default function AppLayout() {
  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  )
}
