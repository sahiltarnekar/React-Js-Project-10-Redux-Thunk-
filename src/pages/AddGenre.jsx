import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { addGenre, updateGenre, getGenre } from "../redux/genreSlice";

function AddGenre() {
  const { register, handleSubmit, reset } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { genres, loading } = useSelector((state) => state.genre);

  // Load genres and populate form for edit
  useEffect(() => {
    if (genres.length === 0) {
      dispatch(getGenre());
    }
    
    if (id) {
      const foundGenre = genres.find((genre) => genre.id === id);
      if (foundGenre) {
        reset(foundGenre);
      }
    }
  }, [id, genres.length, dispatch, reset]);

  const onSubmit = async (data) => {
    try {
   
      const normalizedName = data.Genre_Name?.trim().toLowerCase();
      const alreadyExists = genres.some(
        (genre) => 
          genre.Genre_Name?.trim().toLowerCase() === normalizedName && 
          genre.id !== id
      );

      if (alreadyExists) {
        Swal.fire({
          icon: "error",
          title: "Duplicate Genre",
          text: "Genre with this name already exists!",
        });
        return;
      }

      let result;
      if (id) {
        // Update existing genre
        result = await dispatch(updateGenre({ id, data })).unwrap();
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Genre updated successfully",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        // Add new genre
        const newGenre = { ...data, id: Date.now().toString(16) };
        result = await dispatch(addGenre(newGenre)).unwrap();
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Genre added successfully",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      // Force redirect after success (with small delay for user to see success message)
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1600);

    } catch (error) {
      console.error("Genre save error:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: id ? "Failed to update genre" : "Failed to add genre",
      });
    }
  };

  return (
    <div className="page-container">
      <div className="container-box">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="page-title">
            {id ? "Edit Genre" : "Add New Genre"}
          </h2>
          <button
            onClick={() => navigate("/")}
            className="btn btn-secondary"
          >
            <i className="bi bi-arrow-left me-1"></i> Back to Genres
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label fw-bold">Genre Name <span className="text-danger">*</span></label>
            <input
              {...register("Genre_Name", { 
                required: "Genre name is required" 
              })}
              className="form-control"
              placeholder="Enter genre name (e.g., Action, Comedy)"
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold">Status</label>
            <select
              {...register("status")}
              className="form-select"
              disabled={loading}
            >
              <option value="Active">Active</option>
              <option value="Deactive">Deactive</option>
            </select>
          </div>

          <div className="d-flex gap-2">
            <button
              type="submit"
              className="btn-primary-custom"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Saving...
                </>
              ) : id ? (
                "Update Genre"
              ) : (
                "Add Genre"
              )}
            </button>
            
            <button
              type="button"
              onClick={() => navigate("/")}
              className="btn btn-outline-secondary"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddGenre;
