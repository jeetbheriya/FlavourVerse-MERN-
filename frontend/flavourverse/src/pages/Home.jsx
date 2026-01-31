import React, {useState} from "react";
import {useNavigate} from 'react-router-dom'
import '../App.css'
import foodRecipe from "../assets/Paneer-Tikka.jpg";
import RecipeItems from "../components/RecipeItems";
import Modal from "../components/Modal";
import InputForm from "../components/inputForm";

function Home() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const addrecipe = () => {
    let token = localStorage.getItem("token");
    if(token){
      navigate("/addRecipe");
    }else{
      setIsOpen(true);
    }
    
  }; 
  return (
    <>
      <section className="home">
        <div className="left">
          <h1>Food Recipe</h1>
          <h5>
            Discover, cook, and share delicious recipes from around the world.
            Simple steps, rich flavors, and home-style cooking made easy.
          </h5>
          <button onClick={addrecipe}>Share your recipe</button>
        </div>

        <div className="right">
          <img src={foodRecipe} alt="Food Recipe" />
        </div>
      </section>

      <div className="bg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#F6F0D7"
            fillOpacity="1"
            d="M0,192L26.7,192C53.3,192,107,192,160,181.3C213.3,171,267,149,320,133.3C373.3,117,427,107,480,112C533.3,117,587,139,640,154.7C693.3,171,747,181,800,181.3C853.3,181,907,171,960,149.3C1013.3,128,1067,96,1120,90.7C1173.3,85,1227,107,1280,128C1333.3,149,1387,171,1413,181.3L1440,192L1440,320L0,320Z"
          />
        </svg>
      </div>
      { (isOpen) && <Modal onClose={() => setIsOpen(false)}><InputForm setIsOpen={()=>setIsOpen(false)}/></Modal>}

      <div className="recipe" >
        <RecipeItems />
      </div>
    </>
  );
}

export default Home;
