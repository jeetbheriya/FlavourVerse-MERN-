import React from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home";
import MainNavigation from './components/MainNavigation';
import axios from 'axios';
import AddFoodRecipe from './pages/AddFoodRecipe'
import EditRecipe from './pages/EditRecipe';
import RecipeDetails from './components/RecipeDetails';

const getAllRecipes = async () => {
  let allRecipes = []
  await axios.get('http://localhost:8080/recipe').then(res => {
    allRecipes = res.data;
  });
  return allRecipes;
}

const getMyRecipes = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const allRecipes = await getAllRecipes();
  
  const userId = user?._id || user?.id; // Handle both _id and id

  return allRecipes.filter(item => {
    const creatorId = item.createdBy?._id || item.createdBy || item.user;
    return String(creatorId) === String(userId);
  });
};

const getfacRecipes = () => {
  return JSON.parse(localStorage.getItem("fav"));
}

const router = createBrowserRouter([ 
  {path:"/", element:<MainNavigation/>,children:[
    {path:"/", element:<Home/>,loader:getAllRecipes},
    {path:"/myRecipe", element:<Home />,loader:getMyRecipes},
     {path:"/favRecipe", element:<Home />, loader:getfacRecipes},
     {path:"/addRecipe", element:<AddFoodRecipe />},
     {path:"/editRecipe/:id", element:<EditRecipe />},
     {path:"/recipe/:id", element:<RecipeDetails />},
  ]}
])

function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App