import axios from 'axios';
import { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import './write.css';
import { 
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage';
import app from '../../firebase';

export default function Write() {
  const [title,setTitle] = useState("");
  const [desc,setDesc] = useState("");
  const [file,setFile] = useState(null);
  const [photo, setPhoto] = useState(null)
  const {user} = useContext(Context);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const newPost = {
      username:user.username,
      title,
      desc,
      photo
    };

    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
      },
      async() => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          newPost.photo = downloadURL
          console.log(downloadURL);
        });
      }
    );
    try {
      setTimeout(async () => {
        const res = await axios.post('/posts', newPost);
          console.log(res);
          window.location.replace(`/post/${res.data._id}`)
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='write'>
      {file && (
        <img src={URL.createObjectURL(file)} alt="" className='writeImg' />
      )}
        <form className="writeForm" onSubmit={handleSubmit}>
            <div className="writeFormGroup">
                <label htmlFor="fileInput">
                <i className="writeIcon fa-solid fa-plus"></i>
                </label>
                <input className='input' 
                  type="file"
                  name="" 
                  id="fileInput" 
                  style={{display: 'none'}}
                  onChange={(e)=>setFile(e.target.files[0])}
                />
                <input className='writeInput'  
                  type="text" 
                  placeholder='Title' 
                  autoFocus={true}
                  onChange={e=>setTitle(e.target.value)}
                />
            </div>
            <div className="writeFormGroup">
                <textarea 
                  className='writeInput writeText' 
                  placeholder='tell your story'
                  onChange={e=>setDesc(e.target.value)}
                >
                </textarea>
            </div>
            <button className="writeSubmit" type="submit">Publish</button>
        </form>
    </div>
  )
}
