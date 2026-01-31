import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditRecipe() {
    // Initialize with empty strings to avoid "controlled/uncontrolled" warnings
    const [recipeData, setRecipeData] = useState({
        title: "",
        ingredients: "",
        instructions: "",
        time: ""
    })
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        const getData = async () => {
            try {
                // FIXED PORT: Changed 5000 to 8080
                const response = await axios.get(`http://localhost:8080/recipe/${id}`)
                let res = response.data
                setRecipeData({
                    title: res.title,
                    ingredients: res.ingredients.join(","),
                    instructions: res.instructions,
                    time: res.time
                })
            } catch (err) {
                console.error("Connection Error:", err)
            }
        }
        if (id) getData()
    }, [id])

    const onHandleChange = (e) => {
        let val = (e.target.name === "ingredients") ? e.target.value : (e.target.name === "file") ? e.target.files[0] : e.target.value
        setRecipeData(pre => ({ ...pre, [e.target.name]: val }))
    }

    const onHandleSubmit = async (e) => {
        e.preventDefault()

        // Use FormData for file uploads
        const formData = new FormData()
        formData.append('title', recipeData.title)
        formData.append('time', recipeData.time)
        formData.append('instructions', recipeData.instructions)
        
        // Handle ingredients: send as string if backend splits, or array if not
        const ingItems = Array.isArray(recipeData.ingredients) 
            ? recipeData.ingredients 
            : recipeData.ingredients.split(",")
        ingItems.forEach(ing => formData.append('ingredients', ing))

        if (recipeData.file) {
            formData.append('file', recipeData.file)
        }

        try {
            // FIXED PORT and AUTHORIZATION SPACE
            await axios.put(`http://localhost:8080/recipe/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'authorization': 'Bearer ' + localStorage.getItem("token") // Added space after Bearer
                }
            })
            navigate("/myRecipe")
        } catch (err) {
            console.error("Update failed:", err.response?.data || err.message)
        }
    }

    return (
        <div className='container'>
            <form className='form' onSubmit={onHandleSubmit}>
                <div className='form-control'>
                    <label>Title</label>
                    <input type="text" className='input' name="title" onChange={onHandleChange} value={recipeData.title || ""}></input>
                </div>
                <div className='form-control'>
                    <label>Time</label>
                    <input type="text" className='input' name="time" onChange={onHandleChange} value={recipeData.time || ""}></input>
                </div>
                <div className='form-control'>
                    <label>Ingredients</label>
                    <textarea className='input-textarea' name="ingredients" rows="5" onChange={onHandleChange} value={recipeData.ingredients || ""}></textarea>
                </div>
                <div className='form-control'>
                    <label>Instructions</label>
                    <textarea className='input-textarea' name="instructions" rows="5" onChange={onHandleChange} value={recipeData.instructions || ""}></textarea>
                </div>
                <div className='form-control'>
                    <label>Recipe Image</label>
                    <input type="file" className='input' name="file" onChange={onHandleChange}></input>
                </div>
                <button type="submit">Edit Recipe</button>
            </form>
        </div>
    )
}