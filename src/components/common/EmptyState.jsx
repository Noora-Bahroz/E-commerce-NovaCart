export default function EmptyState({ message = 'No products found' }) {
  return (
    <div className="empty-state">
      <p>{message}</p>
    </div>
  )
}
