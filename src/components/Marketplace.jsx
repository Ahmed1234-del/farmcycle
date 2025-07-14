import { useState, useEffect } from 'react'
import Kagame from './kagame.webp'

const Marketplace = () => {
  const [showForm, setShowForm] = useState(false)
  const [editIndex, setEditIndex] = useState(null)
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    seller: '',
    location: '',
    image: null,
  })

  // Simulated admin check (replace with actual JWT logic)
  const isAdmin = true // You can replace this with proper role check later

  const handleChanges = (e) => {
    const { name, value, files } = e.target
    if (name === 'image') {
      setProduct((prev) => ({
        ...prev,
        image: files[0],
      }))
    } else {
      setProduct((prev) => ({
        ...prev,
        [name]: name === 'price' ? parseFloat(value) || 0 : value,
      }))
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', product.title)
    formData.append('description', product.description)
    formData.append('price', product.price)
    formData.append('seller', product.seller)
    formData.append('location', product.location)
    if (product.image) {
      formData.append('image', product.image)
    }

    let response;
    if (editIndex !== null) {
      const productId = products[editIndex].id
      response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        body: formData,
      })
    } else {
      response = await fetch('/api/products', {
        method: 'POST',
        body: formData,
      })
    }

    if (response.ok) {
      await response.json()
      getProducts()
      setShowForm(false)
      setEditIndex(null)
      setProduct({
        title: '',
        description: '',
        price: '',
        seller: '',
        location: '',
        image: null,
      })
    } else {
      console.error('Form submission failed:', response.statusText)
    }
  }

  const handleDelete = async (index) => {
    const productId = products[index].id
    await fetch(`/api/products/${productId}`, { method: 'DELETE' })
    const updated = products.filter((_, i) => i !== index)
    setProducts(updated)
  }

  const handleEdit = (index) => {
    const selected = products[index]
    setProduct({
      title: selected.title,
      description: selected.description,
      price: selected.price,
      seller: selected.seller,
      location: selected.location,
      image: null,
    })
    setEditIndex(index)
    setShowForm(true)
  }

  const getProducts = () => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((json) => setProducts(json))
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-blue-200">
        <h1 className="text-xl font-bold">🌿 FarmCycle Marketplace</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          {showForm ? 'Close Admin Panel' : 'Admin'}
        </button>
      </div>

      {/* Admin Product Form */}
      {isAdmin && showForm && (
        <form onSubmit={handleFormSubmit} className="space-y-4 bg-gray-100 p-4 rounded m-4">
          <h2 className="text-lg font-bold">Add or Edit Product</h2>
          <input type="file" name="image" accept="image/*" onChange={handleChanges} />
          <input type="text" name="title" value={product.title} onChange={handleChanges} placeholder="Title" required className="block w-full p-2 border rounded" />
          <input type="text" name="description" value={product.description} onChange={handleChanges} placeholder="Description" required className="block w-full p-2 border rounded" />
          <input type="number" name="price" value={product.price} onChange={handleChanges} placeholder="Price" required className="block w-full p-2 border rounded" />
          <input type="text" name="seller" value={product.seller} onChange={handleChanges} placeholder="Seller" required className="block w-full p-2 border rounded" />
          <input type="text" name="location" value={product.location} onChange={handleChanges} placeholder="Location" required className="block w-full p-2 border rounded" />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {editIndex !== null ? 'Update Product' : 'Add Product'}
          </button>
        </form>
      )}

      {/* Product List */}
      <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((data, index) => (
          <div key={index} className="bg-slate-200 p-4 rounded shadow">
            <img
              src={data.image ? `http://localhost:3000/uploads/${data.image}` : Kagame}
              alt={data.title}
              className="w-full h-48 object-cover mb-2"
            />
            <h1 className="font-bold">Product: {data.title}</h1>
            <p>Description: {data.description}</p>
            <p>Price: ${data.price}</p>
            <p>Seller: {data.seller}</p>
            <p>Location: {data.location}</p>
            <div className="mt-2 flex gap-2">
              {isAdmin && (
                <>
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </>
              )}
              <button className="bg-green-600 text-white px-3 py-1 rounded">Buy</button>
              <button className="bg-blue-700 text-white px-3 py-1 rounded">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Marketplace
