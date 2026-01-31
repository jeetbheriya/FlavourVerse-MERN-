const Recipes = require("../models/recipe");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + "-" + file.fieldname;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

const getRecipes = async (req, res) => {
  try {
    // find() gets all recipes
    // populate('createdBy', 'username email') joins the User data
    const recipes = await Recipes.find().populate(
      "createdBy",
      "username email",
    );

    return res.json(recipes);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching recipes", error: error.message });
  }
};

const getRecipe = async (req, res) => {
  const recipe = await Recipes.findById(req.params.id);
  res.json(recipe);
};

const addRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, time } = req.body;
    const coverImage = req.file ? req.file.filename : null;

    if (!title || !ingredients || !instructions) {
      return res.status(400).json({ message: "All fields required" });
    }

    const recipe = await Recipes.create({
      title,
      ingredients,
      instructions,
      time,
      coverImage: req.file ? req.file.filename : null,
      createdBy: req.user.id,
    });

    return res.status(201).json(recipe);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

const editRecipe=async(req,res)=>{
    const {title,ingredients,instructions,time}=req.body 
    let recipe=await Recipes.findById(req.params.id)

    try{
        if(recipe){
            let coverImage=req.file?.filename ? req.file?.filename : recipe.coverImage
            await Recipes.findByIdAndUpdate(req.params.id,{...req.body,coverImage},{new:true})
            res.json({title,ingredients,instructions,time})
        }
    }
    catch(err){
        return res.status(404).json({message:err})
    }
    
}

// backend/controller/recipeController.js
const deleteRecipe = async (req, res) => {
    try {
        // Use req.params.id to get the ID from the URL
        const recipe = await Recipes.findByIdAndDelete(req.params.id);
        
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        
        res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
  getRecipes,
  getRecipe,
  addRecipe,
  editRecipe,
  deleteRecipe,
  upload,
};
