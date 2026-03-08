import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, deleteMovie } from "../store/movieSlice";
import MovieCard from "./MovieCard";
import { toast } from "react-toastify";
import { FiFilm, FiLoader } from "react-icons/fi";
import { Link } from "react-router-dom";

const MovieList = () => {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;
    try {
      await dispatch(deleteMovie(id)).unwrap();
      toast.success("Movie deleted successfully!");
    } catch (error) {
      toast.error(error || "Failed to delete movie");
    }
  };

  if (loading && movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <FiLoader className="text-4xl text-amber-400 animate-spin mb-4" />
        <p className="text-gray-400">Loading movies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-32">
        <p className="text-red-400 text-lg">{error}</p>
        <button
          onClick={() => dispatch(fetchMovies())}
          className="mt-4 px-6 py-2 bg-amber-500 text-gray-900 rounded-lg font-medium hover:bg-amber-400 transition-colors cursor-pointer"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Movie Collection
          </h1>
          <p className="text-gray-400 mt-1">
            {movies.length} {movies.length === 1 ? "movie" : "movies"} in your collection
          </p>
        </div>
      </div>

      {movies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="p-6 bg-gray-800/50 rounded-full mb-6">
            <FiFilm className="text-5xl text-gray-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-300 mb-2">
            No movies yet
          </h2>
          <p className="text-gray-500 mb-6 max-w-md">
            Start building your movie collection by adding your first movie.
          </p>
          <Link
            to="/add"
            className="px-6 py-2.5 bg-amber-500 text-gray-900 rounded-lg font-semibold hover:bg-amber-400 transition-colors"
          >
            Add Your First Movie
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;
