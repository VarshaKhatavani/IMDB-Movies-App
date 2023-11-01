import { useEffect, useState } from "react";
import genreids from "../Utility/genre";

export default function WatchList(props) {
  // to render movie details we neede movie object so while storing details
  // to local storage instead of storing id stored movie object

  // let movies = [
  //   {
  //     adult: false,
  //     backdrop_path: "/ogFIG0fNXEYRQKrpnoRJcXQNX9n.jpg",
  //     id: 619930,
  //     title: "Narvik",
  //     original_language: "no",
  //     original_title: "Kampen om Narvik",
  //     overview:
  //       "April, 1940. The eyes of the world are on Narvik, a small town in northern Norway, a source of the iron ore needed for Hitler's war machine. Through two months of fierce winter warfare, the German leader is dealt with his first defeat.",
  //     poster_path: "/gU4mmINWUF294Wzi8mqRvi6peMe.jpg",
  //     media_type: "movie",
  //     genre_ids: [10752, 18, 36, 28],
  //     popularity: 321.063,
  //     release_date: "2022-12-25",
  //     video: true,
  //     vote_average: 7.406,
  //     vote_count: 53,
  //   },
  // ];

  let { watchList, setWatchList, handleRemoveFromWatchList } = props;
  let [genreList, setGenreList] = useState(["All Genres"]);
  let [currGenre, setCurrGenre] = useState("All Genre");
  let [search, setSearch] = useState("");

  useEffect(() => {
    let temp = watchList.map((movieObj) => {
      return genreids[movieObj.genre_ids[0]];
    });
    temp = new Set(temp);
    setGenreList(["All Genres", ...temp]);
  }, [watchList]);

  let handleFilter = (genre) => {
    setCurrGenre(genre);
  };

  let handleSearch = (e) => {
    setSearch(e.target.value);
  };

  let sortAscending = () => {
    let sortedArr = watchList.sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average;
    });
    setWatchList([...sortedArr]);
  };

  let sortDescending = () => {
    let sortedArr = watchList.sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average;
    });
    setWatchList([...sortedArr]);
  };

  return (
    <>
      {/* <div className="flex justify-center ">
        <div className=" w-[15rem] text-center bg-sky-100 text-sky-600 rounded-md p-3 m-2 justify-center items-center flex ">
          All
        </div>
        <div className=" w-[15rem] text-center bg-slate-100 text-slate-500 rounded-md p-3 m-2 justify-center items-center flex">
          All
        </div>
      </div> */}

      <div className="flex justify-center flex-wrap ">
        {genreList.map((genre) => {
          return (
            <div
              onClick={() => handleFilter(genre)}
              className={
                currGenre === genre
                  ? "w-[15rem] text-center bg-sky-100 text-sky-600 rounded-md p-3 m-2 justify-center items-center flex"
                  : "w-[15rem] text-center bg-slate-100 text-slate-500 rounded-md p-3 m-2 justify-center items-center flex"
              }
            >
              {genre}
            </div>
          );
        })}
      </div>

      <div className="flex justify-center my-4 ">
        <input
          onChange={handleSearch}
          className=" relative w-[18rem] bg-slate-100
                 outline-none p-3 rounded-md  px-4 text-base"
          placeholder="Search Movies"
          type="text"
          value={search}
        />
      </div>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Movie Name
              </th>
              <th scope="col" class="px-6 py-3">
                <i onClick={sortAscending} class="fa-solid fa-up-long"></i>{" "}
                &nbsp;&nbsp;Ratings &nbsp;&nbsp;
                <i onClick={sortDescending} class="fa-solid fa-down-long"></i>
              </th>
              <th scope="col" class="px-6 py-3">
                Genre
              </th>
              <th scope="col" class="px-6 py-3">
                Release Date
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {console.log("Hello")}
            {console.log(watchList)}
            {watchList
              .filter((movieObj) => {
                if (currGenre === "All Genres") {
                  return true;
                }
                return genreids[movieObj.genre_ids[0]] === currGenre;
              })
              .filter((movieObj) => {
                return movieObj.title
                  .toLowerCase()
                  .includes(search.toLowerCase());
              })
              .map((movieObj) => {
                return (
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      class="pl-3 pr-0 py-2 font-medium flex text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <img
                        className="h-[5rem] w-[6rem] rounded-md"
                        src={
                          "https://image.tmdb.org/t/p/original/" +
                          movieObj.poster_path
                        }
                        alt=""
                      />{" "}
                      &nbsp;&nbsp;&nbsp;
                      <div className="justify-items-center px-4 py-9">
                        {movieObj.title}
                      </div>
                    </th>
                    <td class="px-6 py-4">
                      <i class="fa-solid fa-star text-yellow-300"></i>{" "}
                      &nbsp;&nbsp;
                      {movieObj.vote_average}
                    </td>
                    <td class="px-6 py-4">
                      {" "}
                      <span class="py-2 px-4 shadow-md no-underline rounded-full bg-slate-100 text-grey font-sans font-semibold text-sm  focus:outline-none mr-2">
                        {genreids[movieObj.genre_ids[0]]}
                      </span>
                    </td>
                    <td class="px-6 py-4">{movieObj.release_date}</td>
                    <td class="px-6 py-4 text-red-500 items-center">
                      <i
                        class="fa-solid fa-trash"
                        onClick={() => handleRemoveFromWatchList(movieObj)}
                      ></i>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}
