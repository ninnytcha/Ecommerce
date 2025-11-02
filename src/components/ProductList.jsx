import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import "../styles/product.css"
import { fetchProductList, fetchProductList2 } from '../api/product';
import { Link, useSearchParams } from 'react-router-dom';

const ProductList = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const pageFromURL = Number(searchParams.get("page")) || 1
    const [page, setPage] = useState(pageFromURL)
    const [hasNext, setHasNext] = useState(true)
    const limit = 15
     useEffect(() => {
      setSearchParams({page:String(page)})
    const loadProducts = async () => {
      try {
        setLoading(true)
        const offset = (page - 1) * limit 
        const products = await fetchProductList2({limit, offset});
        setData(products);
        setHasNext(products.length===limit)
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false)
      }
    };

    loadProducts();
  }, [page]);
  const goBack = () => {
    setPage((p) => Math.max(1,p - 1) )
  }
  const goToNextPage = () => {
    hasNext && setPage((p) => p + 1 )
  }
  if (loading) {
    return <span>Loading...</span>
  }
  return (
    <div className="product-cont">
      <div className="product-list">
        {data.map(product => (
          <Link key={product.id} to={`/product/${product.id}`}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
      <div>
        <button onClick={goBack} disabled={page===1}>
          <span>&lt;back</span>
        </button>
        <span>{page}</span>
        <button onClick={goToNextPage} disabled={!hasNext}>
          <span>next</span>
        </button>
      </div>
    </div>
  );
};

export default ProductList;
