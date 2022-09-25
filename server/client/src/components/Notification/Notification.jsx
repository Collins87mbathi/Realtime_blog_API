
import React from 'react'
import "./Notification.scss";
import { createImageFromInitials } from '../../utils/getInitials';
import {getRandomColor} from '../../utils/getRandomColor'

const Notification = ({notification,setNotification}) => {
  const IM = "https://collinsblogs.herokuapp.com/images/"

const displayNotification = ({id,type,userimg,username,desc}) => {
 let action;

 if (type === 1) {
  action = "commented";
} else if (type === 2) {
  action = "liked";
} else {
  action = "created";
}
return (
  <div className="notification-body" key={id}>
    <img src={
               ( userimg !== null ) ? IM + userimg : createImageFromInitials(500, username , getRandomColor())} alt='profile'/>
  <span className="notification">{`${username} has ${action}  ${desc} post.`}</span>
  </div>
 
);

}

const handleRead = () => {
  setNotification("");
  
};
  return (
    <div className='notification'>
      <div className="title-notification">
        <h3 className='small-title'>Notifications</h3>
        <span onClick={handleRead}>mark all as read</span>
      </div>
      {notification?.map((n) => displayNotification(n))}
    </div>
  )

}

export default Notification