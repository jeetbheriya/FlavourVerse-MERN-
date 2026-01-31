const express = require("express");
const { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe, upload } = require("../controller/recipeController");
const verifyToken = require("../middleware/auth");
const router = express.Router();

router.get("/", getRecipes); // Get all the recipes
router.get("/:id", getRecipe); // Get recipe by id
router.post("/", upload.single('file'), verifyToken, addRecipe); // Add new recipe
router.put("/:id",upload.single('file'),editRecipe) // Edit the recipe
router.delete("/:id", verifyToken, deleteRecipe) // Delete the recipe

module.exports=router;