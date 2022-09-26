import React,{useEffect, useState } from 'react'
import {useParams,Link} from 'react-router-dom'
// import {FaTrashAlt} from 'react-icons/fa'
import TimeAgo from 'react-timeago'
import englishStrings from 'react-timeago/lib/language-strings/en'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import {useSelector} from "react-redux"
// import axios from 'axios';
import "./SinglePost.scss"
import Comments from '../Comments/Comments';
import { axiosInstance } from '../../config/config'
const IM = "https://collinsblogs.herokuapp.com/images/"
const formatter = buildFormatter(englishStrings);

const SinglePost = ({socket}) => {
  const user = useSelector((state)=> state.user.user);
  const {id} = useParams();
  const [singlePost, setSinglePost] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const fetchSinglePost = async () => {
      const res = await axiosInstance.get('post/' + id);
      setSinglePost(res.data.singlepost);
      setTitle(res.data.singlepost.title);
      setDesc(res.data.singlepost.desc);
      
    };
    fetchSinglePost();
  }, [id]);

  const handleDelete = async () => {
    try {
      axiosInstance.defaults.withCredentials = true;
      await axiosInstance.delete('post/ '+ id, {
        data: { username: user.name },
      }, {
        withCredentials: true
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      axiosInstance.defaults.withCredentials = true;
      await axiosInstance.put('post/ '+ id, {
        title,
        desc,
      }, {
        withCredentials: true
      });
      setUpdateMode(false);
    } catch (err) {}
  };
  return (
    <>
    <div className="singlePost">
    <div className="singlePostWrapper">
      {singlePost.postimg && (
        <img src={IM + singlePost.postimg} alt="post img" className="singlePostImg" />
      )}
      {updateMode ? (
        <input
          type="text"
          placeholder=""
          value={title}
          className="singlePostUpdateTitleInput"
          autoFocus={true}
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <div className="singlePostTitleInfo">
          <h4 className="singlePostTitle">{title}</h4>
          {user.name === singlePost.username && (
            <div className="singlePostIcons">
              
              <i
                className="far fa-edit edit"
                onClick={() => setUpdateMode(true)}
              ></i>
              <i className="far fa-trash-alt trash" onClick={handleDelete}></i>
            </div>
          )}
        </div>
      )}
      <div className="singlePostAuthorInfo">
        <span className="singlePostAuthorName">
        <Link className="link" to={`/?username=${singlePost.username}`}>
              <b> {singlePost.username}</b>
            </Link>
        </span>
        {/* <span className="singlePostDate">
          {new Date(singlePost.createdAt).toDateString()}
        </span> */}
        <span className="singlePostTime">{<TimeAgo date={singlePost.createdAt} formatter={formatter} />}</span>
      </div>
      {updateMode ? (
        <textarea
          className="singlePostUpdateDescInput"
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      ) : (
        <p className="singlePostDescription">{desc}</p>
      )}
      {updateMode && (
        <div className="singlePostBtnWrapper">
          <button className="singlePostBtn" onClick={handleUpdate}>
            Update
          </button> 
        </div>
      )}
    </div>
  </div>
  <hr/>
 <Comments comments={singlePost.comments} socket={socket} id={singlePost.id}/>
 </>
  )
}

export default SinglePost