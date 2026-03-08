import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/movies";

// Async Thunks
export const fetchMovies = createAsyncThunk("movies/fetchMovies", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(API_URL);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch movies");
  }
});

export const fetchMovieById = createAsyncThunk("movies/fetchMovieById", async (id, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${API_URL}/${id}`);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch movie");
  }
});

export const createMovie = createAsyncThunk("movies/createMovie", async (movieData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(API_URL, movieData);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to create movie");
  }
});

export const updateMovie = createAsyncThunk("movies/updateMovie", async ({ id, movieData }, { rejectWithValue }) => {
  try {
    const { data } = await axios.put(`${API_URL}/${id}`, movieData);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to update movie");
  }
});

export const deleteMovie = createAsyncThunk("movies/deleteMovie", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to delete movie");
  }
});

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    selectedMovie: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch by ID
      .addCase(fetchMovieById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMovie = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.movies.unshift(action.payload);
      })
      .addCase(createMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(updateMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.movies.findIndex((m) => m._id === action.payload._id);
        if (index !== -1) state.movies[index] = action.payload;
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(deleteMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = state.movies.filter((m) => m._id !== action.payload);
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedMovie, clearError } = movieSlice.actions;
export default movieSlice.reducer;
