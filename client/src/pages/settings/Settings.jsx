import React,{useContext, useState} from 'react';
import SideBar from '../../components/sidebar/Sidebar';
import { Context } from '../../context/Context';
import axios from 'axios';
import './settings.css';


export default function Settings() {

  const {user, dispatch} = useContext(Context);
  const [file,setFile] = useState(null);
  const [username,setUsername] = useState(null);
  const [email,setEmail] = useState(null);
  const [password,setPassword] = useState(null);
  const [success,setSuccess] = useState(false);
  const [error,setError] = useState(false);

  const PF  = "http://localhost:5000/images/"
  
  const handleUpdate = async(e) => {
    e.preventDefault();
    dispatch({type: "UPDATE_START"})
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password
    }
  if(file){
    const data = new FormData();
    const fileName = Date.now() + file.name;
    data.append("name",fileName)
    data.append("file",file)
    updatedUser.profilePic = fileName;
    try {
      await axios.post("/upload", data);
    } catch (error) {
      console.log(error);
    }
  }
  try {
    const res = await axios.put(`/user/${user._id}`,updatedUser );
    setSuccess(true);
    dispatch({type: "UPDATE_SUCCESS", payload: res.data});
  } catch (error) {
    console.log(error);
    setError(true);
    dispatch({type: "UPDATE_FAILURE"});
  }
}

const handleDelete = async() => {
  try {
    await axios.delete(`/user/${user._id}`,{
      data:{userId:user._id},
    },
      dispatch({type: "LOGOUT"}),
      window.location.replace('/')
      );
  } catch (error) {
    console.log(error);
  }
}

  return (
      <div className="settings">
        <div className="settingsWrapper">
          <div className="settingsTitle">
            <span className="settingsTitleUpdate">Update Your Account</span>
            <span className="settingsTitleDelete" id='del' onClick={handleDelete}>Delete Account</span>
          </div>
          <form className="settingsForm" onSubmit={handleUpdate}>
            <label>Profile Picture</label>
            <div className="settingsPP">
              <img 
                src={file ? URL.createObjectURL(file) : PF+user.profilePic}
                alt=""
              />
              <label htmlFor="fileInput">
              <input 
                  type="file"
                  name="" 
                  id="fileInput" 
                  style={{display: 'none'}}
                  onChange={(e)=>setFile(e.target.files[0])}
                />
                <i className="settingsPPIcon far fa-user-circle"></i>{" "}
              </label>
            </div>
            <label>Username</label>
            <input type="text" placeholder={user.username} onChange={e=>setUsername(e.target.value)} required/>
            <label>Email</label>
            <input type="email" placeholder={user.email} onChange={e=>setEmail(e.target.value.toLowerCase())} required/>
            <label>Password</label>
            <input type="password" placeholder="Password.." onChange={e=>setPassword(e.target.value)} required/>
            <button className="settingsSubmitButton" type="submit">
              Update
            </button>
          {success && 
            <span style={{color: "green", textAlign: "center", marginTop: "20px"}}>{user.username} Your Profile Is Updated</span>
          }
          </form>
          {error && 
            <span>{user.username} Sorry Please Try Again</span>
          }
        </div>
        <SideBar />
      </div>
    );
  }