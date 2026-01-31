import React, { useState, useEffect } from "react";
import "./Navbar.css";
import Modal from "../components/Modal";
import InputForm from "./inputForm.jsx"
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  let token = localStorage.getItem("token");
  const [isLogin, setIsLogin] = useState(token ? false : true);
  let user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setIsLogin(token ? false : true)
  }, [token])

  const checkLogin = () => {
    if(token){
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLogin(true);
      window.location.href = "/";
    }else{
      setIsOpen(true);
    }
  };

  return (
    <>
      <header className="navbar">
        <h2 className="logo">Flavour Verse</h2>
        <ul className="nav-links">
          <li><NavLink to="/">Home</NavLink></li>
          <li onClick={() => isLogin && setIsOpen(true)}><NavLink to={!isLogin ? "/myRecipe" : "/"}>My Recipe</NavLink></li>
          <li onClick={() => isLogin && setIsOpen(true)}><NavLink to={!isLogin ? "/favRecipe" : "/"}>Favourites</NavLink></li>
          <li onClick={checkLogin}><p className="login">{(isLogin) ? "Login" : "Logout"}{user?.email ? user?.email : "" }</p></li>
        </ul>
      </header>
      { (isOpen) && <Modal onClose={() => setIsOpen(false)}><InputForm setIsOpen={()=>setIsOpen(false)}/></Modal>}
    </>
  );
}
