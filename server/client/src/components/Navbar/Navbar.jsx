import React,{useState} from 'react'
import {HiOutlineMenuAlt4} from 'react-icons/hi'
import {FaRegTimesCircle} from 'react-icons/fa'
import './Navbar.scss';
import logo from "./logo.png";
// import avatar from "./avatar.png"
import {useSelector,useDispatch} from 'react-redux';
import { createImageFromInitials } from '../../utils/getInitials';
import {getRandomColor} from '../../utils/getRandomColor'
import {logout} from "../../Redux/Slices/userSlice";
import {Link} from "react-router-dom";
import Noty from './Noty';

const Navbar = ({notification}) => {
  const dispatch = useDispatch();
  const[click, setClick] = useState(false);
  const handleClick = () => setClick(!click)
  const user = useSelector((state)=> state.user.user);
  const IM = "https://collinsblogs.herokuapp.com/images/"
 

  return (
      <div className='navbar'>
          <div className='container'>
              <img className='logo' src={logo} alt="logo"/>
              <Link to ='/notification'>
              <Noty width={"32px"} color="rgb(45, 45, 222)" count={notification?.length} />
                </Link>
              <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                  <li><Link to='/'>Home</Link></li>
                  <li><Link to='/write'>Write</Link></li>
                  <li><Link to='/saved'>Saved</Link></li>
                  <li className="logout" onClick={(e) => {
                    dispatch(logout())
                  }}>
                  {user && "Logout"}
                  </li>
                  <div>
                    { user ? (
                       <Link to="/settings">
                       <img className="topImg" src={
                         ( user?.img !== null ) ? IM + user?.img : createImageFromInitials(500, user?.name , getRandomColor())
                       } alt="img" />
                     </Link>
                    ):(
                      <div  className="topRight">
                      <li><Link to='/login'><button className="btn">Login</button></Link></li>
                      <li><Link to='/signup'><button className="btn active-btn">Sign up</button></Link></li>
                      </div>
                    )}
              
                       </div>
                  </ul>
              <div className='hamburger' onClick={handleClick}>
                  {click ? (<FaRegTimesCircle className='icon' />) : (<HiOutlineMenuAlt4 className='icon' />)}
              
              </div>
          </div>
      </div>
  )
}

export default Navbar