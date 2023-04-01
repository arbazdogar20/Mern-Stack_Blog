import { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import './login.css';
import axios from 'axios';

export default function Login() {

  const userRef = useRef();
  const passwordRef = useRef();
  const {dispatch,isFetching} = useContext(Context);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    dispatch({type:"LOGIN_START"});
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      },
      );
      dispatch({type:"LOGIN_SUCCESS", payload: res.data});
    } catch (error) {
      dispatch({type:"LOGIN_FAILURE"});
      setError(true)
    }
  }
  return (
    <div className='login'>
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
            <lable>Username</lable>
            <input 
              className='loginInput' 
              type='text' 
              placeholder='Enter Your Username...'
              ref={userRef} 
            />
            <lable>Password</lable>
            <input
              className='loginInput'
              type='password'
              placeholder='Enter Your Password...' 
              ref={passwordRef}
            />
            <button className="loginButton" disabled={isFetching}>Login</button>
        </form>
        <button className="loginRegisterButton" type='submit'>
        <Link className='link' to='/register'>Register</Link>
        </button>
        {error && (
          <span style={{marginTop: "20px", color:"red", fontFamily: "'Josefin Sans', sans-serif", fontSize: "18px"}}>*Invalid Username And Password</span>
        )}
    </div>
  )
}
