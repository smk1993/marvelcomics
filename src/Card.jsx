import React from 'react'
import './Card.css';
 const  Card = ({comic:{title , thumbnail}}) => {
    return (
        <div className="card">
        { thumbnail && <div>
            <img className="image" src= {thumbnail.path+"."+thumbnail.extension} alt={title} />
        </div>}
        <div className="card_footer">
            <span>{title}</span>
            </div>
        </div>
    )
}
export default Card
