import { useEffect, useState } from "react";
import "../styles/movies.scss";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import axios from "axios";
import moviesData from "../data/movies.json";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // State to manage loading state
  const moviesPerPage = 10;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setMovies(moviesData);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
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
                <div className="top-container" key={i}>
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

/*This is a React component named `Movies` responsible for fetching and displaying a list of movies from an API. Here's an explanation of its key parts:

1. **State Management**:
   - `movies`: State variable to store the fetched movies data.
   - `currentPage`: State variable to keep track of the current page for pagination.
   - `loading`: State variable to manage the loading state while fetching data.

2. **Fetching Movies**:
   - It uses the `useEffect` hook to fetch movies data when the component mounts.
   - Axios is used to make a POST request to the specified API endpoint.
   - Upon successful response, the fetched movies data is stored in the `movies` state, and the loading state is set to `false`.

3. **Pagination**:
   - Movies are paginated to display only a certain number of movies per page.
   - The `paginate` function updates the `currentPage` state when a pagination button is clicked.
   - Pagination buttons are dynamically generated based on the total number of movies and the number of movies per page.

4. **Rendering Movies**:
   - Conditional rendering is used to display a loading state while fetching data. Placeholder elements are displayed until the data is fetched.
   - Once the data is fetched, actual movie cards are rendered using the fetched movie data.
   - Each movie card contains information such as title, genre, director, stars, language, page views, and voting statistics.

5. **Voting Controls**:
   - Voting controls (upvote and downvote) are displayed for each movie using `FaCaretUp` and `FaCaretDown` icons from the `react-icons/fa` package.

6. **Trailer Button**:
   - A "Watch Trailer" button is provided for each movie card.

7. **Pagination Navigation**:
   - Pagination buttons allow users to navigate between pages of movies.
   - The currently active page is highlighted.

Overall, this component provides a user interface to view a list of movies, navigate between pages using pagination, and interact with voting controls and trailer buttons. */
