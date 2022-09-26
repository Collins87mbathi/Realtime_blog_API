import React,{useState, useEffect} from 'react'
import "./Filter.scss"
// import axios from 'axios';
import { axiosInstance } from '../../config/config';
// import {BASE_URL} from '../../config/config'

const Filter = ({search,setSearch,category,setCategory}) => {

  const [options,setOptions] = useState([]);

  useEffect(()=> {
   const filterCate = async () => {
   const res  = await axiosInstance.get('category/all');
    setOptions(res.data.allcategories)
   }
   
   filterCate();
  },[])
 
const handleCategory = e => {
  setCategory(e.target.value)
  setSearch('')
}
  return (
    <div className="filter">
      <div className="search-filter">
    
      <input type="text"  value={search} placeholder='search here....' onChange={e => setSearch(e.target.value.toLowerCase())} className='searchItem'/>
    
    
    
      </div>
      <div className="search-button">
      <select name="category" value={category} onChange={handleCategory} >
                    <option value=''>All categories</option>
                    {
                        options?.map(category => (
                            <option value={category.title} key={category.id}>
                                {category.title}
                            </option>
                        ))
                    }
                </select>
      </div>
    </div>
  )
}

export default Filter