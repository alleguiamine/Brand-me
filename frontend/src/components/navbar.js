import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/api/products/categories");
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {categories.map((category, index) => (
          <li key={index}>
            {/* Utilisez un lien pour naviguer vers la page HomeScreen avec la catégorie sélectionnée comme paramètre */}
            <Link to={`/products/${category}`}>{category}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;      