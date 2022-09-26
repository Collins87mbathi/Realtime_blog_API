import React, { useState,useEffect } from 'react';
import Filter from '../Filter/Filter';
import Post from './Post';
import "./Posts.scss";

import { axiosInstance } from '../../config/config';
// import {BASE_URL} from '../../config/config'

const Posts = ({socket}) => {
  const [posts, setPosts] = useState([])
    const [category, setCategory] = useState('')
    const [search, setSearch] = useState('')
    
    useEffect(() =>{
      const getProducts = async () => {
          const res = await axiosInstance.get(`post/all?category=${category}&search=${search}`);
          setPosts(res.data.posts)
      }
      getProducts()
  },[ category,search])

  return (
    <>
    <Filter search={search} category={category} setSearch={setSearch} setCategory={setCategory}/>
    <div className='Posts'>
     {posts?.length === 0 ? (<p>no post with that name or category</p>) : (

posts?.map((post) => {
  return <Post socket={socket} key={post.id} post={post}/>
})
     )
      
     }
    </div>
    </>
  )
}

export default Posts