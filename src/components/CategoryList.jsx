import { useEffect, useState } from "react";
import { fetchCategory } from "../api/categories";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export const CategoryList= () => {
    const [categories, setCategories] = useState([])
     useEffect(() => {
        const loadCategories = async () => {
          try {
            const result = await fetchCategory(10);
            setCategories(result)
          } catch (err) {
            console.error("Error fetching related product", err);
          }
        };
        
        loadCategories();
      }, []);
    return (
        <>
        <span>Categories</span>
            <ButtonGroup variant="contained" aria-label="Basic button group" >
              {categories.map((category)=> (
              <Button><Link to={`/productsbycategory/${category.id}`} key={category.id}>{category.name}</Link></Button>              
              )
             )}
            </ButtonGroup>
        
        </>

    )

}