
import './App.css';
import { useQuery } from 'react-query';
import ReactPaginate from 'react-paginate';
import {useState, useEffect} from 'react';
import Card from './Card';
import Header from './Header';
import Heroes from './Heroes';

function App({itemsPerPage=5}) {
  const [results , setResults] = useState([]);
  const[selectedHeroesComics , setSelectedHeroesComics] = useState([]);
  const [characters , setCharacters] = useState([]);
  const[searchActive , setSearchActive] = useState(false);
  const[searchResults , setSearchResuts] = useState([]);
  // Pagination 
  const items = searchResults.length ? searchResults : selectedHeroesComics;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);
 

  const fetchApi = async() => {
    const res = await fetch(`https://gateway.marvel.com:443/v1/public/comics?ts=thesoer&apikey=12da66669715df0a3bfb3502de9933e2&hash=fc6c0593311d6901c54912117c3a04ba`)
    const data =  res.json();
    return data;
  }
  const fetchCharacters = async() => {
    const res = await fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=thesoer&apikey=12da66669715df0a3bfb3502de9933e2&hash=fc6c0593311d6901c54912117c3a04ba`)
    const data =  res.json();
    return data;
  }
  const fetchByCharacter = async(id) => {
    const res = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}/comics?ts=thesoer&apikey=12da66669715df0a3bfb3502de9933e2&hash=fc6c0593311d6901c54912117c3a04ba`)
    const comics =  await res.json();
    return comics;
  }
  const { data, error, isError, isLoading } = useQuery('comics', fetchApi);
  const heroes = useQuery('characters', fetchCharacters);
  useEffect(() => {
    if(data && data.data.results) {
      setResults(data.data.results)
    }
    if(heroes.data && heroes.data.data.results) {
      setCharacters(heroes.data.data.results)
    }
   
  }, [data , heroes, searchActive])

    if (isLoading) {
      return <div>Loading...</div>
  }
  if (isError) {
      return <div>Error! {error.message}</div>
  }
  const handleSelectedHeroes = async(id) => {
    const data = await fetchByCharacter(id)
    setSelectedHeroesComics([...data.data.results , ...selectedHeroesComics]);
  }

const handlesearchComicsbyName = (searchKey) => {
  if(searchKey === '') {
    setSearchActive(false);
    setSearchResuts([]);
  }
  setSearchActive(true);
  if(selectedHeroesComics.length) {
    const comics = searchKey.length && selectedHeroesComics.filter((list) => list.title.toLowerCase().includes(searchKey.toLowerCase()));
    if(comics.length && searchActive) {
      setSearchResuts(comics);
    }
  } else {
  const comics = searchKey.length && results.filter((list) => list.title.includes(searchKey));
  if(comics.length && searchActive) {
    setSearchResuts(comics);
  }
  }
}
const onClearFilter = () => {
  setSelectedHeroesComics([]);
}
// pagination handler
const handlePageClick = (event) => {
  const newOffset = (event.selected * itemsPerPage) % items.length;
  setItemOffset(newOffset);
};
  return (
    <div className="App">
      <Header searchComicsbyName={handlesearchComicsbyName}/>
      <Heroes
       characters = {characters}
       searchResults={searchResults}
       selectedHeroes={handleSelectedHeroes}
       clearFilter={onClearFilter}
      />
      <div className="container">
        {searchResults.length ? <div>Search Results</div>:''}
        {searchResults.length ? <div className="selected_container"> 
        <div className="card_container">
        {currentItems.map((comic) => (
        <Card comic={comic}/>
      ) )}
      </div>
           <ReactPaginate
        breakLabel="..."
        nextLabel= ">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        containerClassName="paginator"
        previousLabel="<"
        renderOnZeroPageCount={null}
        pageClassName="listItem"
        activeClassName="selectedPage"
      />
       </div>:
        selectedHeroesComics.length ? <div className="selected_container"> 
        <div className="card_container">
        {currentItems.map((comic) => (
        <Card comic={comic}/>
      ) )}
      </div>
           <ReactPaginate
        breakLabel="..."
        nextLabel= ">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        containerClassName="paginator"
        previousLabel="<"
        renderOnZeroPageCount={null}
        pageClassName="listItem"
        activeClassName="selectedPage"
      />
       </div> :   results.map((comic) => (
        <Card comic={comic}/>
      ) )}
   
      </div>
 

    </div>
  );
}

export default App;
