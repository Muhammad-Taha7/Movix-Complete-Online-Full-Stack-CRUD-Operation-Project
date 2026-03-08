import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import MovieList from "./components/MovieList";
import MovieForm from "./components/MovieForm";

export const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/add" element={<MovieForm />} />
            <Route path="/edit/:id" element={<MovieForm />} />
          </Routes>
        </main>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          theme="dark"
          toastStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151" }}
        />
      </div>
    </Router>
  );
};
