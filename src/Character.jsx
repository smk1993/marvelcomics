import React, {useRef, useEffect} from 'react'
import './Character.css';
 const Character =({character:{thumbnail,id, name},addCharacters, selected, searchResults}) => {
     const characterRef = useRef(null);
     useEffect(() => {
         if(!selected.length) {
            characterRef.current.className = 'character';
            characterRef.current.style.pointerEvents = 'auto';
         }
        
     }, [selected])
     useEffect(() => {
         if(searchResults.length) {
        characterRef.current.style.pointerEvents = 'none';
         } else {
            characterRef.current.style.pointerEvents = 'auto';
         }
     }, [searchResults])
     const handleClick = () => {
         characterRef.current.className+= ' selected';
         characterRef.current.style.pointerEvents = 'none';
        addCharacters(id, name);
     }
    return (
        <div className="character" onClick={() =>handleClick()} ref={characterRef}>
            <img className="character_image"src={thumbnail.path + "." +thumbnail.extension} alt={name}/>
        </div>
    )
}

export default Character