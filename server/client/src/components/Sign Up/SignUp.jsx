import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom";
import {useDispatch} from 'react-redux';
// import axios from 'axios';
// import {BASE_URL} from '../../config/config'
import './SignUp.scss';
import {setLoginFailure,setIsFetching} from "../../Redux/Slices/userSlice";
import { axiosInstance } from '../../config/config';

const SignUp = () => {
  const dispatch = useDispatch();
  const initialValues = { name: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    setLoading(true);
    dispatch(setIsFetching());
  try {
    // axios.defaults.withCredentials = true;
    const res = await axiosInstance.post('user/register', formValues);
    setLoading(false);
    res.data && window.location.replace("#/login");
  } catch (error) {
    dispatch(setLoginFailure());
    setLoading(false);
    console.log(error);
  }
  };

  useEffect(() => {
    
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors,formValues,isSubmit]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  return (
    <div className="signup">
    {/* {Object.keys(formErrors).length === 0 && isSubmit ? (
      <div className=" message success">Signed in successfully</div>
    ) : (
      <div className=" message success">Signed in successfully</div> 
    )} */}

    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <div className="divider"></div>
      <div className="form">
        <div className="field">
          <label>name</label>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={formValues.name}
            onChange={handleChange}
            className="input"
          />
        </div>
        <p className="errors">{formErrors.name}</p>
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
        <p className="errors">{formErrors.email}</p>
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
        <p className="errors">{formErrors.password}</p>
        <button className="signup-button"  disabled={loading ? true : false}>{loading ?  <i className="fa fa-spinner fa-spin"></i> : "submit"}</button>
      </div>
    </form>
    <span>if you already have an account please log in here <Link to="/login">Log in</Link></span>
  </div>
  )
}

export default SignUp