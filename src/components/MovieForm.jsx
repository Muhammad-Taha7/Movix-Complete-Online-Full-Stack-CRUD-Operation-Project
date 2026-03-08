import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createMovie, updateMovie, fetchMovieById, clearSelectedMovie } from "../store/movieSlice";
import { toast } from "react-toastify";
import { FiSave, FiX, FiFilm } from "react-icons/fi";

const genres = [
  "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary",
  "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi",
  "Thriller", "War", "Western",
];

const MovieForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const { selectedMovie, loading } = useSelector((state) => state.movies);

  const [form, setForm] = useState({
    title: "",
    description: "",
    year: new Date().getFullYear(),
    genre: "",
    rating: 0,
    image: "",
  });

  useEffect(() => {
    if (isEditing) {
      dispatch(fetchMovieById(id));
    }
    return () => {
      dispatch(clearSelectedMovie());
    };
  }, [id, isEditing, dispatch]);

  useEffect(() => {
    if (isEditing && selectedMovie) {
      setForm({
        title: selectedMovie.title || "",
        description: selectedMovie.description || "",
        year: selectedMovie.year || new Date().getFullYear(),
        genre: selectedMovie.genre || "",
        rating: selectedMovie.rating || 0,
        image: selectedMovie.image || "",
      });
    }
  }, [selectedMovie, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "year" || name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.description.trim() || !form.genre) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      if (isEditing) {
        await dispatch(updateMovie({ id, movieData: form })).unwrap();
        toast.success("Movie updated successfully!");
      } else {
        await dispatch(createMovie(form)).unwrap();
        toast.success("Movie added successfully!");
      }
      navigate("/");
    } catch (error) {
      toast.error(error || "Something went wrong");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-amber-500/10 rounded-xl">
          <FiFilm className="text-2xl text-amber-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">
            {isEditing ? "Edit Movie" : "Add New Movie"}
          </h1>
          <p className="text-gray-400 text-sm">
            {isEditing ? "Update movie details" : "Fill in the movie details below"}
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 space-y-5"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Title <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter movie title"
            className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors placeholder:text-gray-600"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Description <span className="text-red-400">*</span>
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter movie description"
            rows={4}
            className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors resize-none placeholder:text-gray-600"
          />
        </div>

        {/* Year + Genre row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Year <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              name="year"
              value={form.year}
              onChange={handleChange}
              min={1900}
              max={2030}
              className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Genre <span className="text-red-400">*</span>
            </label>
            <select
              name="genre"
              value={form.genre}
              onChange={handleChange}
              className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
            >
              <option value="">Select genre</option>
              {genres.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Rating (0-10)
          </label>
          <input
            type="number"
            name="rating"
            value={form.rating}
            onChange={handleChange}
            min={0}
            max={10}
            step={0.1}
            className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://example.com/poster.jpg"
            className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors placeholder:text-gray-600"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 bg-amber-500 text-gray-900 py-2.5 rounded-lg font-semibold hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <FiSave />
            {loading ? "Saving..." : isEditing ? "Update Movie" : "Add Movie"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 bg-gray-700 text-gray-300 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-600 transition-colors cursor-pointer"
          >
            <FiX />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default MovieForm;
