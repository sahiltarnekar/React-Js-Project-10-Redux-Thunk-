import GenreList from "../pages/GenreList"; 
import AddGenre from "../pages/AddGenre";
import MovieList from "../pages/MovieList";
import AddMovie from "../pages/AddMovie";
import SingleMovie from "../pages/SingleMovie"; // Import the new page

const Routing = [
  // Genre Routes
  {
    path: "/",
    element: GenreList,
  },
  {
    path: "/add-genre",
    element: AddGenre,
  },
  {
    path: "/add-genre/:id",
    element: AddGenre,
  },

  // Movie Routes
  {
    path: "/movies",
    element: MovieList,
  },
  {
    path: "/add-movie",
    element: AddMovie,
  },
  {
    path: "/add-movie/:id",
    element: AddMovie,
  },
  
  // Single View Route
  {
    path: "/movies/view/:id",
    element: SingleMovie,
  }
];

export default Routing;