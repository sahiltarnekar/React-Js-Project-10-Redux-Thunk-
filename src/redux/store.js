// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";
import genreReducer from "./genreSlice";

const store = configureStore({
  reducer: {
    movies: movieReducer,
    genre: genreReducer,
  },
});

export default store;
