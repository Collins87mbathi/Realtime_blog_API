
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/Sign Up/SignUp";
import Write from "./components/Write/Write";
import Saved from './components/Saved/Saved';
// import Settings from "./components/Settings/Settings";
import Setting from "./components/Settings/Setting";
import Notification from "./components/Notification/Notification";
import Categories from "./components/categories/Categories";
import {HashRouter, Routes, Route} from "react-router-dom";
import {useSelector} from 'react-redux';
import { io } from "socket.io-client";
import SinglePost from "./components/SinglePost/SinglePost";
import { useEffect, useState } from "react";

function App() {
const user = useSelector((state) => state.user.user);
const [socket, setSocket] = useState(null);
const [notification,setNotification] = useState([]);
useEffect(()=> {
   setSocket(io("http://localhost:3001"));
},[]);

useEffect(() => {
  socket?.emit("newUser", user);
}, [socket, user]);


useEffect(()=> {
  socket?.on('addPostResponse', (data) => {
  setNotification((prev) => [...prev, data]);
  });

},[socket]);

useEffect(()=> {
  socket?.on('LikePostResponse', (data) => {
    setNotification((prev) => [...prev, data]);
  });

},[socket]);

useEffect(()=> {
  socket?.on('CommentPostResponse', (data) => {
    setNotification((prev) => [...prev, data]);
  });
},[socket]);

  return (
   <HashRouter>
   <Routes>
    <Route path="/" element={<Home setNotification={setNotification}  notification={notification} socket={socket}/>} />
    <Route path="/signup" element={<SignUp/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/write" element={user ? <Write socket={socket}/> : <Login/>}/>
    <Route path="/saved" element={<Saved/>}/>
    <Route path="/settings" element={<Setting/>}/>
    <Route path="/categories" element={<Categories/>}/>
    <Route path="/notification" element={user ? <Notification notification={notification} socket={socket}/> : <Login/>}/>
    <Route path="/post/:id" element={<SinglePost  socket={socket}/>}/>
   </Routes>
   </HashRouter>
     
    
  );
}

export default App;
