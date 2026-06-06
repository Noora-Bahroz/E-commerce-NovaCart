export default function LoadingSpinner() {
  return (
    <div className="loading-spinner" role="status" aria-label="Loading">
      <div className="spinner" />
      <span className="sr-only">Loading products...</span>
    </div>
  )
}
