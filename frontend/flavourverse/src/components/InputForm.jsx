import React, {useState} from 'react'
import './Modal.css'
import axios from 'axios'

export default function InputForm({setIsOpen}) {
  const [email, setEmail] = useState("");
  const [password, setPassword ] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError ] = useState("");

   const handleOnSubmit = async (e) => {
    e.preventDefault();
    let endpoint = (isSignUp) ? "signup" : "login";
    try {
      const res = await axios.post(`http://localhost:8080/${endpoint}`, { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      
      setIsOpen(); // Now this will work because the prop is correctly destructured
      window.location.reload(); // Optional: reloads to update the Navbar state immediately
    } catch (err) {
      // Your backend returns "message" usually, check your backend controller
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
    <form className='form' onSubmit={handleOnSubmit}>
        <div className='form-control'>
            <label>Email</label>
            <input type="email" className='input' onChange={(e) => setEmail(e.target.value)} required></input>
        </div>
        <div className='form-control'>
            <label>Password</label>
            <input type="password" className='input' onChange={(e) => setPassword(e.target.value)} required></input>
        </div>
        <button type='submit'>{(isSignUp) ? "Sign Up" : "Login"}</button>
        {(error!="") && <h6 className="error">{error}</h6>}
        <p onClick={() => setIsSignUp(prev=>!prev)}>{(isSignUp) ? "Already have an account" : "Create new account"}</p>
    </form>
    </>
  )
}
