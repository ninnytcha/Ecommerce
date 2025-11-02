const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} width={150} />
      <div className="product-card-text">
        <h3>{product.title}</h3>
        <p>${product.price}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Rating:</strong> {product.rating?.rate} ⭐ ({product.rating?.count})</p>
      </div>
    </div>
  );
};

export default ProductCard;
