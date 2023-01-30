import React,{useState} from 'react'
import './Search.css';
 const  Search = ({handleSearch}) => {
     const [value , setValue] = useState([]);
     const handleChange = (e) => {
        setValue(e.target.value)
        handleSearch(e.target.value);
     }
    return (
        <div>
            <input 
            aria-label="search_input"
            onChange = {handleChange}
            value={value}
            placeholder='Search for comics' />
        </div>
    )
}

export default Search