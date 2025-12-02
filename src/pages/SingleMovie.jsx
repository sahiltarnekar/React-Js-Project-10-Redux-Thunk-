import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMovieById } from "../redux/movieSlice";
import { getGenre } from "../redux/genreSlice";

function SingleMovie() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { currentMovie, loading } = useSelector((state) => state.movies);
  const { genres } = useSelector((state) => state.genre);

  useEffect(() => {
    if (id) {
      dispatch(getMovieById(id));
    }
    if (genres.length === 0) {
      dispatch(getGenre());
    }
  }, [id, dispatch, genres.length]);

  const getGenreName = (genreId) => {
    const genre = genres.find((g) => g.id === genreId);
    return genre ? genre.Genre_Name : "Unknown";
  };

  if (loading || !currentMovie) {
    return (
      <div className="page-container">
        <div className="container-box text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2">Loading movie details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Header with back button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title">Movie Details</h2>
        <Link to="/movies" className="btn btn-secondary">
          <i className="bi bi-arrow-left me-2"></i> Back to List
        </Link>
      </div>

      <div className="container-box">
        <div className="row">
          {/* Movie poster */}
          <div className="col-md-4 mb-4 mb-md-0 text-center">
            {currentMovie.image ? (
              <img
                src={currentMovie.image}
                alt={currentMovie.title}
                className="img-fluid rounded shadow"
                style={{ maxHeight: 400, objectFit: "cover", width: "100%" }}
              />
            ) : (
              <div
                className="d-flex align-items-center justify-content-center bg-light rounded"
                style={{ height: 300, color: "#aaa" }}
              >
                <i className="bi bi-image" style={{ fontSize: "3rem" }}></i>
                <p className="ms-2">No Poster Available</p>
              </div>
            )}
          </div>

          {/* Movie details */}
          <div className="col-md-8">
            <h1 className="mb-3 fw-bold text-dark">{currentMovie.title}</h1>

            <div className="d-flex flex-wrap gap-2 mb-4">
              <span className="badge bg-primary fs-6">
                {getGenreName(currentMovie.genreId)}
              </span>
              <span className="badge bg-secondary fs-6">
                <i className="bi bi-calendar-event me-1"></i> {currentMovie.releaseDate}
              </span>
            </div>

            <div className="row mb-3">
              <div className="col-sm-6">
                <h6 className="text-muted text-uppercase small fw-bold">Director</h6>
                <p className="fs-5">{currentMovie.director || "N/A"}</p>
              </div>
              <div className="col-sm-6">
                <h6 className="text-muted text-uppercase small fw-bold">Producer</h6>
                <p className="fs-5">{currentMovie.producer || "N/A"}</p>
              </div>
            </div>

            <hr className="text-muted opacity-25" />

            <div className="mb-4">
              <h6 className="text-muted text-uppercase small fw-bold mb-2">Description</h6>
              <p className="text-secondary" style={{ lineHeight: 1.6 }}>
                {currentMovie.description || "No description provided."}
              </p>
            </div>

            <div className="d-flex gap-2">
              <Link to={`/add-movie/${currentMovie.id}`} className="btn-edit text-decoration-none">
                <i className="bi bi-pencil-square me-1"></i> Edit Movie
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleMovie;
