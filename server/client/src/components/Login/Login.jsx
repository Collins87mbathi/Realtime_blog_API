import React,{useState} from 'react'
import { Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {axiosInstance} from '../../config/config';
// import axios from 'axios';
import {setIsFetching, setLoginFailure, setLoginSuccess} from '../../Redux/Slices/userSlice';
import './Login.scss'

const Login = () => {
  const initialValues = {email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const dispatch = useDispatch();
 

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setIsFetching());
    setLoading(true);
    try {
      const res = await axiosInstance.post('user/login', formValues, {
        withCredentials:true,
      });
      
      dispatch(setLoginSuccess(res.data));
      res.data && window.location.replace("/");
      setLoading(false);
    } catch (error) {
      dispatch(setLoginFailure());
       setErrors(error.message);
       console.log(error);
      setLoading(false);
    }


  };
  return (
    <div className="signup">
    <form onSubmit={handleSubmit}>
      <h1>Log in</h1>
      <div className="divider"></div>
      <div className="form">
        <div className="field">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formValues.email}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formValues.password}
            onChange={handleChange}
            className="input"
          />
        </div>
        <p className="errors">{errors.message}</p>
        <button className="signup-button"  disabled={loading ? true : false}>{loading ?  <i className="fa fa-spinner fa-spin"></i> : "submit"}</button>
      </div>
    </form>
    <span>if you don't have an account please create here <Link to="/signup">sign Up</Link></span>
  </div>
   
  )
}

export default Login