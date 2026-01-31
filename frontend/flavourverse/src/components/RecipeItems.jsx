import React, { useState, useEffect } from "react";
import "./RecipeItems.css";
import { useLoaderData, Link, useLocation } from "react-router-dom";
import { BsFillStopwatchFill } from "react-icons/bs";
import { FaHeart, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";

export default function RecipeItems() {
  const recipes = useLoaderData();
  const location = useLocation();

  const [allRecipes, setAllRecipes] = useState([]);
  const [favItems, setFavItems] = useState(
    JSON.parse(localStorage.getItem("fav")) ?? []
  );

  // FIXED: Case-insensitive check to ensure buttons appear on /myRecipe
  const isMyRecipePage = location.pathname.toLowerCase() === "/myrecipe";

  useEffect(() => {
    setAllRecipes(recipes || []);
  }, [recipes]);

  // ❤️ Toggle favourite
  const favRecipe = (item) => {
    const exists = favItems.some(r => r._id === item._id);

    const updatedFavs = exists
      ? favItems.filter(r => r._id !== item._id)
      : [...favItems, item];

    setFavItems(updatedFavs);
    localStorage.setItem("fav", JSON.stringify(updatedFavs));
  };

  // 🗑️ Delete recipe
  const onDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;

    try {
      await axios.delete(`http://localhost:8080/recipe/${id}`, {
        headers: {
          // Added space after Bearer to fix 400 Bad Request errors
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setAllRecipes(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="card-container">
      {allRecipes.map((item) => (
        <div key={item._id} className="card">
          {/* Wrap main content in a Link to the details page */}
          <Link to={`/recipe/${item._id}`} className="card-link">
            <img
              src={`http://localhost:8080/images/${item.coverImage}`}
              alt={item.title}
              width="120"
              height="100"
            />
            <div className="card-body">
              <div className="title">{item.title}</div>
            </div>
          </Link>

          {/* Footer section remains clickable for icons */}
          <div className="card-footer">
            <div className="icons">
              <div className="timer">
                <BsFillStopwatchFill />
                <span>{item.time}</span>
              </div>

              <div className="right-icons">
                {/* ❤️ Favourite */}
                <FaHeart
                  onClick={() => favRecipe(item)}
                  style={{
                    color: favItems.some(r => r._id === item._id) ? "red" : "gray",
                    cursor: "pointer",
                  }}
                />

                {/* ✏️ 🗑️ Actions */}
                {isMyRecipePage && (
                  <div className="action">
                    <Link to={`/editRecipe/${item._id}`} className="editIcon">
                      <FaEdit />
                    </Link>
                    <MdDelete
                      onClick={() => onDelete(item._id)}
                      className="deleteIcon"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}