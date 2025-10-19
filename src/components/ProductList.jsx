import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import "../styles/product.css"
import { fetchProductList } from '../api/product';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
     useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        const products = await fetchProductList();
        setData(products);
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
    <div className="product-list">
      {data.map(product => (
        <Link key={product.id} to={`/product/${product.id}`}>
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
