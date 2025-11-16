import { Link, useParams } from "react-router-dom"
import { fetchCategoryProducts } from "../api/categories"
import { useEffect, useState } from "react"

export const CategoryPage = () => {
  const [catProducts, setCatProducts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const load = async () => {
      const products = await fetchCategoryProducts(id); // don't need Number(id)
      setCatProducts(products);
    };
    load();
  }, [id]);

  return (
    <div>
        
      <h2>Category products</h2>
      {catProducts.length==0&& <span>There are no product in this category</span>}

      {catProducts.map(product => (
        <Link to={`/product/${product.id}`} key={product.id}>
          <p>{product.title}</p>
          <img
            src={product.images?.[0]}
            style={{ width: "100px", height: "100px" }}
          />
        </Link>
      ))}
    </div>
  );
};
