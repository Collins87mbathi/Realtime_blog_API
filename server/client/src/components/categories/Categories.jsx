import React,{useState} from 'react'
// import axios from 'axios'
import './Categories.scss';
import { axiosInstance } from '../../config/config';

const Categories = () => {
    const [category, setCategory] = useState('')
    const createCategory = async e =>{
        e.preventDefault()
        try {
        const res = await axiosInstance.post('category/create', {title: category})
       alert(res.data.msg)
       setCategory('') 
        } catch (err) {
            alert(err.response.data.msg)
        }
    }




  return (
    <div className="categories">
    <form onSubmit={createCategory}>
        <label htmlFor="category">Category</label>
        <input type="text" name="category" value={category} required
        onChange={e => setCategory(e.target.value)} />

        <button type="submit">Create</button>
    </form>
</div>
  )
}

export default Categories