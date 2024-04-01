import { useEffect, useState } from "react";
import "../styles/movies.scss";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import axios from "axios";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true); // State to manage loading state
  const moviesPerPage = 10;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.post(
          "https://hoblist.com/api/movieList",
          {
            category: "movies",
            language: "kannada",
            genre: "all",
            sort: "voting",
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        setMovies(response.data.result);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMovies();
  }, []);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="movie-container">
        {loading
          ? Array.from({ length: moviesPerPage }, (_, i) => (
              <div className="movie-card " key={i}>
                <div className="top-container">
                  <div className="voting-container "></div>
                  <div className="movie-poster "></div>
                  <div className="info-container ">
                    <div className="title "></div>
                    <div className="details "></div>
                  </div>
                </div>
                <div className="bottom-container "></div>
              </div>
            ))
          : currentMovies.map((movie) => (
              <div className="movie-card" key={movie.id}>
                <div className="top-container">
                  <div className="voting-container">
                    <div>
                      <FaCaretUp />
                    </div>
                    <div>{movie.voting}</div>
                    <div>
                      <FaCaretDown />
                    </div>
                  </div>
                  <div className="movie-poster">
                    <img src={movie.poster} alt={movie.title} />
                  </div>
                  <div className="info-container">
                    <h2>{movie.title}</h2>
                    <p>Genre: {movie.genre}</p>
                    <p>Director: {movie.director}</p>
                    <p>Starring: {movie.stars}</p>
                    <div>
                      <span>Mins</span>
                      <span className="snd">{movie.language}</span>
                    </div>
                    <div>
                      <span>{movie.pageViews} views</span>
                      <span className="snd">Voted by {movie.totalVoted}</span>
                    </div>
                  </div>
                </div>
                <div className="bottom-container">
                  <button>Watch Trailer</button>
                </div>
              </div>
            ))}
      </div>
      <div className="pagination">
        {Array.from(
          { length: Math.ceil(movies.length / moviesPerPage) },
          (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};
export default Movies;
