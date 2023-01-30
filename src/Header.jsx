import React from 'react'
import './Header.css'
import Search from './Search'

const  Header = ({searchComicsbyName}) => {
    const onHandleSearch  = (searchElement) => {
        searchComicsbyName(searchElement);
    }
    return (
        <div className="header">
            Marvel
            <Search handleSearch={onHandleSearch}/>  
        </div>
    )
}

export default Header