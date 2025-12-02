import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  addMovie,
  updateMovie,
  getMovieById,
  clearCurrentMovie,
} from "../redux/movieSlice";
import { getGenre } from "../redux/genreSlice";

function AddMovie() {
  const { register, handleSubmit, reset, watch } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { genres } = useSelector((state) => state.genre);
  const { currentMovie } = useSelector((state) => state.movies);

  const imageUrl = watch("image");

  useEffect(() => {
    dispatch(getGenre());
    if (id) dispatch(getMovieById(id));
    else {
      dispatch(clearCurrentMovie());
      reset({});
    }
  }, [id, dispatch, reset]);

  useEffect(() => {
    if (id && currentMovie) reset(currentMovie);
  }, [currentMovie, id, reset]);

  const save = async (data) => {
    try {
      if (id) {
        await dispatch(updateMovie({ id, data })).unwrap();
        Swal.fire("Success", "Movie updated successfully", "success");
      } else {
        if (!data.id) data.id = Date.now().toString(16);
        await dispatch(addMovie(data)).unwrap();
        Swal.fire("Success", "Movie added successfully", "success");
      }
      navigate("/movies");
    } catch (err) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="page-container">
      <div className="container-box">
        <h2 className="page-title mb-3">{id ? "Edit Movie" : "Add Movie"}</h2>
        <form onSubmit={handleSubmit(save)}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Movie Title</label>
              <input {...register("title")} className="form-control" required />
            </div>
            <div className="col-md-6 mb-3">
              <label>Director</label>
              <input {...register("director")} className="form-control" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label>Producer</label>
              <input {...register("producer")} className="form-control" />
            </div>
            <div className="col-md-4 mb-3">
              <label>Release Date</label>
              <input type="date" {...register("releaseDate")} className="form-control" />
            </div>
            <div className="col-md-4 mb-3">
              <label>Genre</label>
              <select {...register("genreId")} className="form-select">
                <option value="">Select Genre</option>
                {genres.map((c) => (
                  <option key={c.id} value={c.id}>{c.Genre_Name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label>Movie Poster URL</label>
            <input
              type="url"
              className="form-control"
              placeholder="https://example.com/image.jpg"
              {...register("image")}
            />
            <div className="form-text">Paste a direct link to an image.</div>
            {imageUrl && (
              <div className="mt-3">
                <p className="mb-1 text-muted small">Preview:</p>
                <img
                  src={imageUrl}
                  alt="Preview"
                  onError={(e) => { e.target.style.display = "none"; }}
                  style={{
                    height: "150px",
                    objectFit: "contain",
                    border: "1px solid #ddd",
                    padding: "5px",
                    borderRadius: "6px",
                  }}
                />
              </div>
            )}
          </div>
          <label>Description</label>
          <textarea {...register("description")} className="form-control mb-3" rows="3" />
          <button type="submit" className="btn-primary-custom">
            {id ? "Update Movie" : "Submit Movie"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddMovie;
