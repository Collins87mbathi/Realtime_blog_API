import {useState, useEffect} from 'react'
import axios from 'axios'
import { BASE_URL } from '../config/config'
// import {BASE_URL} from '../config/config'


function PostApi() {
    const [posts, setPosts] = useState([])
    const [category, setCategory] = useState('')
    const [search, setSearch] = useState('')
 

    useEffect(() =>{
        const getProducts = async () => {
            const res = await axios.get(`${BASE_URL}/api/post/all?category=${category}&search=${search}`)
            setPosts(res.data.posts)

        }
        getProducts()
    },[ category,search])
   
    return {
        posts: [posts],
        category: [category, setCategory],
        search: [search, setSearch],
    }
}

export default PostApi