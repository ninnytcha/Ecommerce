import React, { useEffect, useState } from 'react';
import "../styles/productDetail.css"; 
import { Link, useParams } from 'react-router-dom';
import { fetchProduct } from '../api/product';

const ProductDetail = () => {
    const {id}=useParams()
     const [product, setProduct] = useState([])
        const [loading, setLoading] = useState(false)
         useEffect(() => {
        const loadProducts = async () => {
          try {
            setLoading(true)
            const products = await fetchProduct({id});
            setProduct(products);
          } catch (error) {
            console.error("Failed to fetch products:", error);
          } finally {
            setLoading(false)
          }
        };
    
        loadProducts();
      }, []);
      if (loading) {
        return <span>Loading...</span>
      }



  return (
    <div className="product-detail">
        <Link to="/">Go back</Link>
      <img src={product.image} alt={product.title} className="product-image" />
      <div className="product-info">
        <h2>{product.title}</h2>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Description:</strong> {product.description}</p>
        <p><strong>Rating:</strong> {product.rating?.rate} ⭐ ({product.rating?.count} reviews)</p>
      </div>
    </div>
  );
};

export default ProductDetail;
