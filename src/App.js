import './App.css';
import Navbar from './Components/Navbar';
import MovieList from './Components/MovieList';
import Banner from './Components/Banner';
import WatchList from './Components/WatchList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MovieDetails from './Components/MovieDetails';

function App() {

  let [watchlist, setWatchList] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  const totalPages = 500;

  let handleAddToWatchList = (movieObj) => {
    console.log("hello", watchlist);
    //let newWatchList = [...watchlist];
    //newWatchList.push(id);

    //same thing in one line
    let newWatchList = [...watchlist, movieObj]; //watchlist === null ? [movieObj] : 
    // copy watchlist array to newWatchList & push the latest id to newWatchList array
    localStorage.setItem("movies-app", JSON.stringify(newWatchList));
    console.log("newWatchList----", newWatchList);
    setWatchList(newWatchList);
  };

  let handleRemoveFromWatchList = (movieObj) => {
    // newWatchList contains all the elements from the original watchlist
    // array except for the one with the id value that matches the one passed as an argument to the function
    let newWatchList = watchlist.filter((movie) => {
      return movie.id !== movieObj.id;
    });
    localStorage.setItem("movies-app", JSON.stringify(newWatchList));
    setWatchList(newWatchList);
  };

  useEffect(() => {
    let favouriteMoviesLocalStorage = JSON.parse(
      localStorage.getItem("movies-app")
    );
    if(favouriteMoviesLocalStorage == null){
      return;
    }
    setWatchList(favouriteMoviesLocalStorage);
  }, []);

  // Pagination

  
  // For example, show 5 pages centered around the current page
  function calculatePagesToShow() {
    const pagesToShow = [];
    const pagesToDisplay = 5;

    // start page will be
    let startPage = Math.max(currentPage - Math.floor(pagesToDisplay / 2), 1);
    let endPage = startPage + pagesToDisplay - 1;

    // handle edge case for last page
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - pagesToDisplay + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pagesToShow.push(i);
    }

    return pagesToShow;
  }

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function handleNext() {
    setCurrentPage(currentPage + 1);
  }

  function handlePrev() {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }

  return (
        <BrowserRouter>
            <Navbar/> 
            <Routes>
              <Route path="/" element={
                <>
                  <Banner/>
                  <MovieList watchList={watchlist}
                             setWatchList={setWatchList}
                             handleAddToWatchList={handleAddToWatchList}
                             handleRemoveFromWatchList={handleRemoveFromWatchList}
                             currentPage={currentPage}
                             totalPages={totalPages}
                             onPageChanges={handlePageChange}
                             calculatePagesToShow={calculatePagesToShow}
                             handleNext={handleNext}
                             handlePrev={handlePrev}/>           
                </>
              }></Route>
              <Route path="/watchlist" element={
                <WatchList watchList={watchlist} 
                          setWatchList={setWatchList}
                          handleRemoveFromWatchList={handleRemoveFromWatchList}
                />}>                
              </Route>
              
              <Route path="/movie/:id" element={<MovieDetails />} />
              
              {/* Note - Path is specified in Navbar anchor-->Link tag */}
            </Routes>
        </BrowserRouter>  
      );
}

export default App;
