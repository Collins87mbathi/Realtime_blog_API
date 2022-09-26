import React,{useState,useEffect} from 'react'
import axios from "axios";
import {useSelector} from "react-redux"
import {axiosInstance} from "../../config/config"
import {AiOutlinePlusCircle} from "react-icons/ai";
import './Write.scss'

const Write = ({socket}) => {
  const user = useSelector((state)=> state.user.user);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [category,setCategory] = useState("");
  
  useEffect(() => {
    const getCategories = async () => {
      const res = await axiosInstance.get('category/all');
     setCategories(res.data.allcategories)
    };
    getCategories();
  }, []);

const handleSubmit = async (e) =>{
  e.preventDefault();
  socket.emit('addPost', {
    username:user.name,
    desc:title,
    userimg:user.img,
    type:3
  });
  
  const newPost = {
    title,
    desc,
    category,
    userId: user.id,
    username: user.name,
    userimg: user.img
  };
  if (file) {
    const data = new FormData();
    const filename = Date.now() + file.name;
    data.append("name", filename);
    data.append("file", file);

    newPost.postimg = filename;
    try {
      axios.defaults.withCredentials = true;
      await axios.post('upload', data, {
        withCredentials: true
      });
    } catch (err) {
      console.log(err);
    }
  }
  try {
    axios.defaults.withCredentials = true;
    const res  = await axios.post('post/create',
    newPost, {
      withCredentials:true
    }
    );
    //  window.location.replace("/");
    window.location.replace("/post/" + res.data.savedPost.id);
   console.log(axios.request);
  } catch (err) {
    console.log(err);
  }
}

  return (
   <div className="write">
    <div className="writeWrapper">
        {file && (
          <img src={URL.createObjectURL(file)} alt="" className="writeImg" />
        )}
        <form className="writeForm" onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="fileInput">
              <AiOutlinePlusCircle className='write-icon'/>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <input
              type="text"
              className="writeInput"
              placeholder="Title for your story"
              autoFocus={true}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="formGroup selectDiv">
            <textarea
              className="textInput"
              type="text"
              placeholder="Share your story..."
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
            <select  onChange={(e) => setCategory(e.target.value)}  className="selectCat">
            <option disabled>Category</option>
              {categories?.map((cat) => (
                <option key={cat.id}>{cat.title}</option>
              ))}
            </select>
          </div>
          <button className="writeBtn" type="submit">
            Publish
          </button>
        </form>
      </div>
   </div>
  )
}

export default Write