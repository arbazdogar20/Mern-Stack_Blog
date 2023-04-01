import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './register.css';
export default function Register() {
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState(false);

  const handleSubmit = async (e) =>{
    try {
      e.preventDefault();
      setError(false);
      const res = await axios.post("/auth/register",{
        username,email,password
      });
      res.data && window.location.replace('/login');
    } catch (error) {
      setError(true);      
    }
  }
  return (
    <div className='register'>
        <span className="registerTitle">Register</span>
        <form className="registerForm" onSubmit={handleSubmit}>
            <lable>Username</lable>
            <input 
              className='registerInput' 
              type='text' 
              placeholder='Enter Your Name...'
              required
              onChange={(e)=>setUsername(e.target.value)}
            />
            <lable>Email</lable>
            <input 
              className='registerInput' 
              type='email' 
              placeholder='Enter Your Email...'
              required
              onChange={e=>setEmail(e.target.value.toLowerCase())}
            />
            <lable>Password</lable>
            <input
              className='registerInput' 
              type='password' 
              placeholder='Enter Your Password...'
              required
              onChange={e=>setPassword(e.target.value)} 
            />
            <button className="registerButton" type="submit">Register</button>
        </form>
        <button className="registerLoginButton">
          <Link className='link' to='/login'>Login</Link>
        </button>
        {error && (
          <span style={{color: "red", marginTop: '15px'}}>* This Username & Email Is Already Taken.</span>
        )}
      </div>
  )
}
