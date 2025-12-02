// src/redux/genreSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "./Api"; // adjust path

export const addGenre = createAsyncThunk("genre/addGenre", async (data) => {
  const res = await Api.post("/Genres", data);
  return res.data;
});

export const getGenre = createAsyncThunk("genre/getGenre", async () => {
  const res = await Api.get("/Genres");
  return res.data;
});

export const deleteGenre = createAsyncThunk(
  "genre/deleteGenre",
  async (id) => {
    await Api.delete(`/Genres/${id}`);
    return id;
  }
);

export const updateGenre = createAsyncThunk(
  "genre/updateGenre",
  async ({ id, data }) => {
    const res = await Api.put(`/Genres/${id}`, data);
    return res.data;
  }
);

const genreSlice = createSlice({
  name: "genre",
  initialState: {
    genres: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addGenre.fulfilled, (state, action) => {
        state.genres.push(action.payload);
      })
      .addCase(getGenre.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGenre.fulfilled, (state, action) => {
        state.loading = false;
        state.genres = action.payload;
      })
      .addCase(getGenre.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteGenre.fulfilled, (state, action) => {
        state.genres = state.genres.filter((g) => g.id !== action.payload);
      })
      .addCase(updateGenre.fulfilled, (state, action) => {
        state.genres = state.genres.map((g) =>
          g.id === action.payload.id ? action.payload : g
        );
      });
  },
});

export default genreSlice.reducer;
