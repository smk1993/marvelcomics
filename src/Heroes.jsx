import React,{useState, useRef,useEffect} from 'react'
import './Heroes.css';
import Character from './Character';
 const  Heroes = ({characters, selectedHeroes, clearFilter, searchResults}) => {
    const heroRef = useRef(null);
    const[selected , setSelected] = useState([]);
    useEffect(() => {
    }, [])
    useEffect(() => {
        if(searchResults.length) {
            heroRef.current.style.opacity = '0.5'
        } else {
            heroRef.current.style.opacity = '1.0'
        }
    }, [searchResults])
    const handleCharacters = (id,name) => {
        setSelected([name, ...selected])
        selectedHeroes(id);
    }
    const clearFilters = () => {
       setSelected([]);
       clearFilter()
    } 
    return (
        <div className="heroes_container" ref={heroRef}> 
        <div className="heroes_list">
            {characters.map((character,i) => (
                <Character 
                key={i}
                character={character}
                selected={selected}
                searchResults={searchResults}
                addCharacters={handleCharacters}
                />
            ))}
            </div>

            { selected.length ?  (
                  <div className="filters">
                      <div>
                          Explore - 
                      {selected.join(',')}
                      </div>
                      <div>
                          <button onClick={clearFilters}>Clear Filters</button>
                      </div>
                    
                  </div>
            ):''}
          
        </div>
    )
}

export default Heroes