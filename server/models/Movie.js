import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Movie title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Movie description is required"],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, "Release year is required"],
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      trim: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
