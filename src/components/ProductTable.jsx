import React, { useEffect, useState } from "react";
import "../styles/productTable.css";
import { Link } from "react-router-dom";
import { fetchProductList2 } from "../api/product";

const ProductTable = () => {
  const limit = 15;
  const offset = 0;
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const handleDelete = async (id) => {
     const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })
        console.log(response)
  };
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProductList2({ limit, offset });
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    loadProducts();
  }, [handleDelete]);

  

  // ✏️ Start editing
  const handleEdit = (product) => {
    setEditingProduct({
      ...product,
    });
  };

  // 💾 Save edited product
  const handleSaveEdit = async () => {
    console.log(editingProduct)
     const response = await fetch(`https://api.escuelajs.co/api/v1/products/${editingProduct.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editingProduct),
        })
    setProducts(
      products.map((p) =>
        p.id === editingProduct.id ? editingProduct : p
      )
    );
    setEditingProduct(null);
  };

  return (
    <div className="product-table-container">
      <h2>Product Table</h2>

      {/* Add New Product */}
      <div className="add-product">
        <Link to="/dashboard/product-create" className="add-button">
          + Create Product
        </Link>
      </div>

      {/* Product Table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Title</th>
            <th>Price ($)</th>
            <th>Category</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) =>
            editingProduct && editingProduct.id === product.id ? (
              <tr key={product.id}>
                <td>{product.id}</td>

                {/* Image - not editable */}
                <td>
                  <img
                    src={product.images?.[0]}
                    alt={product.title}
                    className="product-thumb"
                  />
                </td>

                {/* Editable fields */}
                <td>
                  <input
                    type="text"
                    value={editingProduct.title}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        title: e.target.value,
                      })
                    }
                  />
                </td>

                <td>
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        price: e.target.value,
                      })
                    }
                  />
                </td>

                {/* Category - display only name */}
                <td>
                    <input
                    type="text"
                    value={editingProduct.category.name}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        category: e.target.value,
                      })
                    }/>
                </td>

                <td className="description-cell">
                  <input
                    type="text"
                    value={editingProduct.description}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        description: e.target.value,
                      })
                    }/>
                </td>

                <td>
                  <button className="save-btn" onClick={handleSaveEdit}>
                    Save
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => setEditingProduct(null)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <img
                    src={product.images?.[0]}
                    alt={product.title}
                    className="product-thumb"
                  />
                </td>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>{product.category?.name || "—"}</td>
                <td className="description-cell">
                  {product.description?.slice(0, 50)}...
                </td>
                <td>
                  <button onClick={() => handleEdit(product)}>Edit</button>
                  <button onClick={() => handleDelete(product.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
