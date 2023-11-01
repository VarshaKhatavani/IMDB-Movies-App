import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarRatings from "./StarRatings";

// import genreids from "../Utility/genre";

export default function MovieDetails() {
  const { id } = useParams(); // Get the movie ID from the URL
  const [movieData, setMovieData] = useState(null);
  console.log(id);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=c4503da08fd450674fc73bc1114a40ee`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Netwrok response not found!");
        }
        return response.json();
        //console.log(response.json());
      })
      .then((data) => {
        console.log(data);
        // result = data; // can not use directly as it data will be lost after render
        setMovieData(data);
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
      });
  }, [id]);

  // Conditionally render content only when resultRef.current is defined
  if (!movieData) {
    return null; // Return null or a loading indicator if data is not yet available
  }

  // const maxRating = 10;

  // const starIcons = [];

  // for (let i = 1; i <= maxRating; i++) {
  //   starIcons.push(
  //     <FontAwesomeIcon
  //       icon={faStar}
  //       key={i}
  //       className={i <= rating ? "text-yellow-500" : "text-gray-400"}
  //     />
  //   );
  // }

  let rating;
  rating = Math.round(movieData.vote_average);

  return (
    <>
      <div className="p-4 rounded-lg flex relative">
        {/* Left Side: Movie Image */}
        <div className="w-1/3">
          <img
            src={`http://image.tmdb.org/t/p/original/${movieData.poster_path}`} // {resultRef.current.poster_path}
            alt="Movie Poster"
            className="w-full h-full rounded-lg"
          />
        </div>

        {/* Right Side: Movie Details */}
        <div className="w-2/3 p-4">
          <h2 className="text-3xl font-bold mb-2">
            {movieData.original_title}
          </h2>
          <br />
          <p className="text-gray-700 mb-2">
            <b>Release Date:</b> {movieData.release_date}
          </p>
          <p className="text-gray-700 mb-2">
            <b>Director:</b> John Doe
          </p>
          <p className="text-gray-700 mb-2">
            <b>Genre:</b>{" "}
            {movieData.genres.map((type) => {
              return (
                <>
                  <span class="px-3 py-1 mr-2 rounded-full bg-slate-100 justify-between text-black font-semibold">
                    {" "}
                    {type.name}
                  </span>
                </>
              );
            })}
          </p>
          <p className="text-gray-700 mb-2">
            {" "}
            <b>Ratings:</b> <StarRatings rating={rating} />{" "}
            <b className="text-amber-300">{rating}</b>/10
          </p>
          <br />
          <p className="text-gray-700">{movieData.overview}</p>
        </div>
      </div>
    </>
  );
}
