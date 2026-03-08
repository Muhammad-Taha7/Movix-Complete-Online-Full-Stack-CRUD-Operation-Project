import { Link } from "react-router-dom";
import { FiEdit2, FiTrash2, FiStar, FiCalendar } from "react-icons/fi";

const MovieCard = ({ movie, onDelete }) => {
  const defaultImage = `https://placehold.co/400x600/1f2937/f59e0b?text=${encodeURIComponent(movie.title)}`;

  return (
    <div className="group bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50 hover:border-amber-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1">
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={movie.image || defaultImage}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = defaultImage;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Rating badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-gray-900/80 backdrop-blur-sm px-2 py-1 rounded-full">
          <FiStar className="text-amber-400 text-sm" />
          <span className="text-white text-sm font-medium">{movie.rating}/10</span>
        </div>

        {/* Action buttons on hover */}
        <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300">
          <Link
            to={`/edit/${movie._id}`}
            className="flex-1 flex items-center justify-center gap-1 bg-amber-500 text-gray-900 py-2 rounded-lg text-sm font-semibold hover:bg-amber-400 transition-colors"
          >
            <FiEdit2 />
            Edit
          </Link>
          <button
            onClick={() => onDelete(movie._id)}
            className="flex-1 flex items-center justify-center gap-1 bg-red-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-red-400 transition-colors cursor-pointer"
          >
            <FiTrash2 />
            Delete
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-white font-semibold text-lg truncate">{movie.title}</h3>
        <div className="flex items-center gap-2 mt-1 text-gray-400 text-sm">
          <FiCalendar className="text-xs" />
          <span>{movie.year}</span>
          <span className="text-gray-600">•</span>
          <span className="text-amber-400/80">{movie.genre}</span>
        </div>
        <p className="text-gray-500 text-sm mt-2 line-clamp-2">{movie.description}</p>
      </div>
    </div>
  );
};

export default MovieCard;
