import { Link, useLocation } from "react-router-dom";
import { FiFilm, FiPlus } from "react-icons/fi";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700/50 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <FiFilm className="text-2xl text-amber-400 group-hover:text-amber-300 transition-colors" />
            <span className="text-xl font-bold text-white tracking-wide">
              Movi<span className="text-amber-400">X</span>
            </span>
          </Link>

          <Link
            to="/add"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              location.pathname === "/add"
                ? "bg-amber-500 text-gray-900 shadow-lg shadow-amber-500/25"
                : "bg-gray-700/50 text-gray-300 hover:bg-amber-500 hover:text-gray-900 hover:shadow-lg hover:shadow-amber-500/25"
            }`}
          >
            <FiPlus className="text-lg" />
            Add Movie
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
