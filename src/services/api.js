const BASE_URL = 'https://fakestoreapi.com'

export async function fetchProducts() {
  const res = await fetch(`${BASE_URL}/products`)
  if (!res.ok) throw new Error(`Failed to fetch products (${res.status})`)
  return res.json()
}

export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/products/categories`)
  if (!res.ok) throw new Error(`Failed to fetch categories (${res.status})`)
  return res.json()
}
