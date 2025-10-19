const CartItem = ({ item }) => {
  const { title, price, image, quantity } = item;

  return (
    <div className="cart-item">
      <img src={image} alt={title} className="cart-item-image" />
      <div className="cart-item-details">
        <h4>{title}</h4>
        <p>Price: ${price}</p>
        <p>Quantity: {quantity}</p>
        <p>Subtotal: ${(price * quantity).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartItem;
