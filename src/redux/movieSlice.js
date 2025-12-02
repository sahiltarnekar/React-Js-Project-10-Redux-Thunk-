// src/redux/movieSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "./Api"; // adjust path if needed

// POST - Add Movie
export const addMovie = createAsyncThunk("movies/addMovie", async (data) => {
  const res = await Api.post("/Movies", data);
  return res.data;
});

// GET - All Movies
export const getMovie = createAsyncThunk("movies/getMovie", async () => {
  const res = await Api.get("/Movies");
  return res.data;
});

// GET Single Movie
export const getMovieById = createAsyncThunk(
  "movies/getMovieById",
  async (id) => {
    const res = await Api.get(`/Movies/${id}`);
    return res.data;
  }
);

// DELETE
export const deleteMovie = createAsyncThunk(
  "movies/deleteMovie",
  async (id) => {
    await Api.delete(`/Movies/${id}`);
    return id;
  }
);

// UPDATE
export const updateMovie = createAsyncThunk(
  "movies/updateMovie",
  async ({ id, data }) => {
    const res = await Api.put(`/Movies/${id}`, data);
    return res.data;
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    currentMovie: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentMovie: (state) => {
      state.currentMovie = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ADD
      .addCase(addMovie.fulfilled, (state, action) => {
        state.movies.push(action.payload);
      })

      // GET ALL
      .addCase(getMovie.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(getMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // SINGLE MOVIE
      .addCase(getMovieById.fulfilled, (state, action) => {
        state.currentMovie = action.payload;
      })

      // DELETE
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.movies = state.movies.filter((m) => m.id !== action.payload);
      })

      // UPDATE
      .addCase(updateMovie.fulfilled, (state, action) => {
        state.movies = state.movies.map((m) =>
          m.id === action.payload.id ? action.payload : m
        );
      });
  },
});

export const { clearCurrentMovie } = movieSlice.actions;
export default movieSlice.reducer;
