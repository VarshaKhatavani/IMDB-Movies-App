import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import axios from "axios";

export default function MovieList(props) {
  let {
    watchList,
    handleAddToWatchList,
    handleRemoveFromWatchList,
    currentPage,
    totalPages,
    onPageChanges,
    calculatePagesToShow,
    handleNext,
    handlePrev,
  } = props;

  let [moviesObj, setMovieObj] = useState(undefined);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=c4503da08fd450674fc73bc1114a40ee&page=${currentPage}`
      )
      .then(function (response) {
        console.log(response.data);
        //moviesObj = response.data ;
        setMovieObj(response.data.results);
      });
  }, [currentPage]);

  if (moviesObj === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-auto p-3">
      <div className="text-3xl font-bold text-center p-3">Trending Movies</div>

      <div className="flex flex-wrap gap-4 justify-evenly">
        {moviesObj.map((mObject) => {
          return (
            <MovieCard
              movieObj={mObject}
              key={mObject.id}
              title={mObject.title}
              watchList={watchList}
              poster_path={mObject.poster_path}
              handleAddToWatchList={handleAddToWatchList}
              handleRemoveFromWatchList={handleRemoveFromWatchList}
            />
          );
        })}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChanges={onPageChanges}
        calculatePagesToShow={calculatePagesToShow}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
    </div>
  );
}
