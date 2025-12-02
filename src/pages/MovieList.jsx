import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { getMovie, deleteMovie } from "../redux/movieSlice";
import { getGenre } from "../redux/genreSlice";

function MovieList() {
  const dispatch = useDispatch();
  const { movies, loading } = useSelector((state) => state.movies);
  const { genres } = useSelector((state) => state.genre);

  useEffect(() => {
    dispatch(getMovie());
    dispatch(getGenre());
  }, [dispatch]);

  const getGenreName = (gid) => {
    const f = genres.find((c) => c.id === gid);
    return f ? f.Genre_Name : "-";
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Movie?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(deleteMovie(id)).unwrap();
          Swal.fire("Deleted!", "The movie has been deleted.", "success");
        } catch (err) {
          Swal.fire("Error", "Failed to delete movie", "error");
        }
      }
    });
  };

  return (
    <div className="page-container">
      <div className="container-box">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="page-title">Movie List</h2>
          <NavLink className="btn-primary-custom" to="/add-movie">
            Add Movie
          </NavLink>
        </div>
        <div className="table-responsive">
          <table className="table-clean mt-3">
            <thead>
              <tr>
                <th style={{ width: 80 }}>Image</th>
                <th>Title</th>
                <th>Director</th>
                <th>Release Date</th>
                <th>Genre</th>
                <th>Description</th>
                <th style={{ width: 180 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-5">
                    Loading movies...
                  </td>
                </tr>
              ) : movies.length ? (
                movies.map((mv) => (
                  <tr key={mv.id}>
                    <td>
                      {mv.image ? (
                        <img
                          src={mv.image}
                          alt={mv.title}
                          style={{
                            width: "50px",
                            height: "70px",
                            objectFit: "cover",
                            borderRadius: "4px",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "50px",
                            height: "70px",
                            background: "#eee",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "10px",
                            borderRadius: "4px",
                            color: "#888",
                          }}
                        >
                          No Img
                        </div>
                      )}
                    </td>
                    <td className="fw-bold text-dark">{mv.title}</td>
                    <td>{mv.director}</td>
                    <td>{mv.releaseDate}</td>
                    <td>
                      <span className="badge bg-light text-dark border">
                        {getGenreName(mv.genreId)}
                      </span>
                    </td>
                    <td
                      style={{
                        maxWidth: 200,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {mv.description}
                    </td>
                    <td>
                      <NavLink
                        to={`/movies/view/${mv.id}`}
                        className="btn-view me-2"
                        title="View Details"
                      >
                        <i className="bi bi-eye-fill"></i>
                      </NavLink>
                      <NavLink
                        to={`/add-movie/${mv.id}`}
                        className="btn-edit me-2"
                        title="Edit"
                      >
                        <i className="bi bi-pencil-square"></i>
                      </NavLink>
                      <button
                        onClick={() => handleDelete(mv.id)}
                        className="btn-delete"
                        title="Delete"
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No movies found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MovieList;
