import axios from "axios";


export const axiosInstance = axios.create({
    baseURL: 'https://collinsblogs.herokuapp.com/api/',
    withCredentials:true
  });