import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './RecipeDetails.css';

export default function RecipeDetails() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/recipe/${id}`);
                setRecipe(res.data);
            } catch (err) {
                console.error("Error fetching recipe details", err);
            }
        };
        if (id) fetchRecipe();
    }, [id]);

    if (!recipe) return <div className="loading">Loading recipe details...</div>;

    return (
        <div className="recipe-details">
            <img 
                src={`http://localhost:8080/images/${recipe.coverImage}`} 
                alt={recipe.title} 
                className="main-image"
            />
            <h1>{recipe.title}</h1>
            <div className="info">
                <span>⏱ {recipe.time}</span>
            </div>
            
            <div className="content-section">
                <h3>Ingredients</h3>
                <ul>
                    {recipe.ingredients.map((ing, index) => (
                        <li key={index}>{ing}</li>
                    ))}
                </ul>
            </div>

            <div className="content-section">
                <h3>Instructions</h3>
                <ol>
                    {recipe.instructions.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ol>
            </div>
        </div>
    );
}