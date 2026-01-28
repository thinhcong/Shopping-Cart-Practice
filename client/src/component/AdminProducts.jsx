import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient.js'

const AdminProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '' })

  // ================= FETCH PRODUCTS =================
  const fetchProducts = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('products').select('*').order('id', { ascending: false })
    if (!error) setProducts(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // ================= UPDATE STOCK =================
  const updateStock = async (id, stock) => {
    const { error } = await supabase
      .from('products')
      .update({ stock })
      .eq('id', id)

    if (!error) {
      alert('Cập nhật stock thành công')
      fetchProducts()
    }
  }

  // ================= DELETE PRODUCT =================
  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm('Xóa sản phẩm này?')
    if (!confirmDelete) return

    const { error } = await supabase.from('products').delete().eq('id', id)
    if (!error) {
      alert('Đã xóa sản phẩm')
      fetchProducts()
    }
  }

  // ================= CREATE PRODUCT =================
  const createProduct = async () => {
    if (!newProduct.name || !newProduct.price) return alert('Nhập thiếu thông tin')

    const { error } = await supabase.from('products').insert({
      name: newProduct.name,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock || 0)
    })

    if (!error) {
      alert('Tạo sản phẩm mới thành công')
      setNewProduct({ name: '', price: '', stock: '' })
      fetchProducts() 
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Products</h1>

      {/* CREATE PRODUCT */}
      <div className="bg-white p-4 rounded shadow mb-6 space-y-2 max-w-md">
        <h2 className="font-bold">Thêm sản phẩm mới</h2>
        <input
          placeholder="Tên sản phẩm"
          className="border p-2 w-full"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          placeholder="Giá"
          type="number"
          className="border p-2 w-full"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          placeholder="Stock"
          type="number"
          className="border p-2 w-full"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
        />
        <button onClick={createProduct} className="bg-black text-white px-4 py-2">Tạo</button>
      </div>

      {/* PRODUCT LIST */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full bg-white rounded shadow">
          <thead className="bg-gray-100 ">
            <tr>
              <th className="p-2">Tên</th>
              <th className="p-2">Giá</th>
              <th className="p-2">Stock</th>
              <th className="p-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-2">{p.name}</td>
                <td className="p-2">{p.price}</td>
                <td className="p-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setProducts((prev) =>
                          prev.map((item) =>
                            item.id === p.id ? { ...item, stock: item.stock - 1 } : item
                          )
                        )
                      }
                      className="px-2 bg-gray-200"
                    >
                      -
                    </button>
                    <span>{p.stock}</span>
                    <button
                      onClick={() =>
                        setProducts((prev) =>
                          prev.map((item) =>
                            item.id === p.id ? { ...item, stock: item.stock + 1 } : item
                          )
                        )
                      }
                      className="px-2 bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => updateStock(p.id, p.stock)}
                    className="bg-blue-600 text-white px-3 py-1"
                  >
                    Lưu
                  </button>
                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="bg-red-600 text-white px-3 py-1"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default AdminProducts
