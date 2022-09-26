import React,{useState} from 'react'
import "./Settings.scss";
import {CgProfile} from "react-icons/cg";
// import axios from 'axios';
// import {BASE_URL} from '../../config/config';
import {setUpdateAccount,} from "../../Redux/Slices/userSlice";
import {useSelector} from 'react-redux';
import { createImageFromInitials } from '../../utils/getInitials';
import {getRandomColor} from '../../utils/getRandomColor'
import { axiosInstance } from '../../config/config';
// import { BASE_URL } from '../../config/config';
const Settings = () => {
  const user = useSelector((state) => state.user.user);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState(null);
    const [success, setSuccess] = useState(false);
    let nameImg = user.name;
  

    const handleSubmit = async (e) => {
      e.preventDefault();
      const updatedUser = {
        name,
        email,
        password,
      };
     
      if (file) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
  
        updatedUser.img = filename;
        try {
          axiosInstance.defaults.withCredentials = true;
          await axiosInstance.post('upload', data, {
            withCredentials: true
          });
        } catch (err) {
          console.log(err);
        }
      }
      console.log(file);
      try {
        axiosInstance.defaults.withCredentials = true;
        const res = await axiosInstance.put('user/'+ user.id, updatedUser, {
          withCredentials: true
        });
        setSuccess(true);
        setUpdateAccount(res.data);
      } catch (err) {
        console.log(err);
      }
    };
  
    const handleDelete = async () => {
      try {
        axiosInstance.defaults.withCredentials = true;
        await axiosInstance.delete(`user/${user.id}`, {
          withCredentials: true
        });
      } catch (err) {
        console.log(err);
      }
    };

  return (
    <div className="setting">
      <div className="settingWrapper">
        <div className="settingTitles">
          <span className="settingUpdateTitle">Update Your Account</span>
          <span className="settingDeleteTitle" onClick={handleDelete}>
            Delete Your Account
          </span>
        </div>
        <form className="settingForm" onSubmit={handleSubmit}>
          <label className="settingLabel">Profile Picture</label>
          <div className="settingImage">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : user.img !== null
                  ? user.img
                  : createImageFromInitials(500, nameImg, getRandomColor())
              }
              alt=""
              className="profilePicture"
            />
            <label htmlFor="settingFile">
              <CgProfile  className='profileIcon'/>
            </label>
            <input type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label className="settingLabel">name</label>
          <input
            type="text"
            className="settingInput"
            placeholder={user.name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="settingLabel">Email</label>
          <input
            type="email"
            className="settingInput"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="settingLabel">Password</label>
          <input
            type="password"
            className="settingInput"
            placeholder="--------"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingBtn" type="submit" >
            Update
          </button>

          {success && (
            <span
              style={{ color: "green", textAlign: "center", fontWeight: "500" }}
            >
              Profile has been updated successfully!!
            </span>
          )}
        </form>
      </div>
    </div>
  )
}

export default Settings