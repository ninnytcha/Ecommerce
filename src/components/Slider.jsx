import { useEffect, useState, useRef } from "react";
import { fetchRelatedProductByID } from "../api/product";
import "../styles/slider.css"
import { Link } from "react-router-dom";

export const RelatedProductSlider = ({ id }) => {
  const [data, setData] = useState([]);
  const sliderRef = useRef(null);

  // Fetch products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const result = await fetchRelatedProductByID(id);
        setData(result.slice(0, 20));
      } catch (err) {
        console.error("Error fetching related product", err);
      }
    };
    loadProducts();
  }, [id]);

  const scroll = (direction) => {
    const slider = sliderRef.current;
    if (slider) {
      const scrollAmount = slider.offsetWidth / 2; // scroll by half a screen
      slider.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!data.length) return null;

  return (
    <div className="related-slider">
      <div className="header">
        <h2>Related Products</h2>
        <div className="buttons">
          <button onClick={() => scroll("left")}>&lt;</button>
          <button onClick={() => scroll("right")}>&gt;</button>
        </div>
      </div>

      <div className="slider-container" ref={sliderRef}>
        {data.map((product) => (
          <Link to={`/product/${product.id}`} className="slide" key={product.id}>
            <img src={product.images?.[0]} alt={product.title} />
            <div className="info">
              <h3>{product.title}</h3>
              <p>${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
