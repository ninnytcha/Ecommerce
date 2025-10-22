
import { useEffect, useState } from 'react';
import CartItem from '../components/CartItem';
import "../styles/cart.css";
import { Link } from 'react-router-dom';
import { getUserCart } from '../api/cart';
import { fetchCartProducts } from '../utils/FetchCartProducts';

export const Cart = () => {
   const [cartItems, setCartItems] = useState([])
  useEffect(()=>{
    const fetchtedData = async () => {
      const data = await getUserCart(1)
      const response = await fetchCartProducts({data})
      setCartItems(response)
    }

    fetchtedData()
  } , [])

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
 
  return (
    <div className="cart-page">
        <Link to="/">Go back</Link>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map(item => (
            <Link key={item.id} to={`/product/${item.id}`}>
              <CartItem  item={item} />
            </Link>
          ))}
          <div className="cart-total">
            <h3>Total: ${total.toFixed(2)}</h3>
          </div>
        </>
      )}
    </div>
  );
};


