import React,{useState} from 'react'
import Comment from './Comment';
import './Comments.scss';
import {useSelector} from "react-redux";
import {GrSend} from "react-icons/gr";
import { createImageFromInitials } from '../../utils/getInitials';
import {getRandomColor} from '../../utils/getRandomColor';
// import {BASE_URL} from '../../config/config';
// import axios from 'axios';
import { axiosInstance } from '../../config/config';
const IM = "https://collinsblogs.herokuapp.com/images/"

const Comments = ({comments, id, socket}) => {
  const user = useSelector((state)=> state.user.user);
  const [newComment, setNewComment] = useState("");
  const commentSubmit = async () => {
    socket.emit('CommentPost', {
      username:user.name,
      userimg:user.img,
      desc:newComment,
      type:1
    });

    axiosInstance.defaults.withCredentials = true;
   const res = await axiosInstance.post(`comment/${id}/create`, {
     desc:newComment,
     userId: user.id,
     username: user.name,
     userimg: user.img
   }, {
    withCredentials: true
  });

  res.data && window.location.reload();
  }

  return (
    <div className='Comments-container'>
    <div className="newcomment">
        <img src={ ( user?.img !== null ) ? IM + user?.img : createImageFromInitials(500, user?.name , getRandomColor())} alt='avatar'/>
        <input type="text" placeholder="Add a comment.." onChange={(e)=> setNewComment(e.target.value)} />
        <button className="PostBtn" onClick={commentSubmit}>
            <GrSend/>
        </button>
    </div>
    {comments?.map((comment)=> (
     <Comment key={comment.id}  comment={comment}/>
    ))}
    
    </div>
  )
}

export default Comments