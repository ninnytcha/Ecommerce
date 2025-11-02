const ProductCard = ({ product }) => {
  
  return (
    <div className="product-card">
      <img src={product.images[0]} alt={product.title} width={150} />
      <div className="product-card-text">
        <h3>{product.title}</h3>
        <p>${product.price}</p>
        <p><strong>Category:</strong> {product.category.name}</p>
        {/* <p><strong>Rating:</strong> {product.rating?.rate} ⭐ ({product.rating?.count})</p>  */}
       </div>
    </div>
  );
};

export default ProductCard;
