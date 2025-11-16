import { useEffect, useState } from 'react';
import "../styles/productDetail.css"; 
import { Link, useParams } from 'react-router-dom';
import { fetchProduct2 } from '../api/product';
import { RelatedProductSlider } from '../components/Slider';

const ProductDetail = () => {
  const token = localStorage.getItem("token")
    const {id}=useParams()
     const [product, setProduct] = useState([])
        const [loading, setLoading] = useState(false)
         useEffect(() => {
        const loadProducts = async () => {
          try {
            setLoading(true)
            const products = await fetchProduct2({id});
            
            if (products.status==200) {
              setProduct( await products.json());
            } else {
              setProduct(products);
            }
          } catch (error) {
            console.error("Failed to fetch products:", error);
          } finally {
            setLoading(false)
          }
        }
        loadProducts();
         
      }, [id]);
console.log(product)
      const AddToCart = () => {
        const cart = { userId: 1, products: [{ id: 4 }] };
        fetch(`https://fakestoreapi.com/carts/1`,{
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cart)
        }) .then(response => response.json())
  .then(()=>
            alert("product added to cart")
        ).catch((error)=>
          console.error(error)
        )
      }

      if (loading) {
        return <span>Loading...</span>
      }
      if (product.status==400) {
        return <span>Product not found</span>
      }



  return (
    <div>
    <div className="product-detail">
        <Link to="/">Go back</Link>
      <img src={product?.images?.[0]} alt={product.title} className="product-image" />
      <div className="product-info">
        <h2>{product.title}</h2>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>Category:</strong> {product.category?.name}</p>
        <p><strong>Description:</strong> {product.description}</p> 
        {token && <button onClick={AddToCart}>Add to Cart</button> } 
        
      </div>
      </div>
      <RelatedProductSlider id={id}/>
    </div>
    
  );
};

export default ProductDetail;
