import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { getGenre, deleteGenre } from "../redux/genreSlice";

function GenreList() {
  const dispatch = useDispatch();
  const { genres, loading } = useSelector((state) => state.genre);

  useEffect(() => {
    dispatch(getGenre());
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(deleteGenre(id)).unwrap();
          Swal.fire("Deleted!", "Genre has been deleted.", "success");
        } catch (err) {
          Swal.fire("Error!", "Delete failed.", "error");
        }
      }
    });
  };

  return (
    <div className="page-container">
      <div className="container-box">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="page-title">Movie Genres</h2>
          <NavLink className="btn-primary-custom" to="/add-genre">
            Add Genre
          </NavLink>
        </div>
        <div className="table-responsive">
          <table className="table-clean mt-3">
            <thead>
              <tr>
                <th style={{ width: 60 }}>#</th>
                <th>Genre Name</th>
                <th style={{ width: 120 }}>Status</th>
                <th style={{ width: 160 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center">Loading...</td>
                </tr>
              ) : genres.length ? (
                genres.map((c, i) => (
                  <tr key={c.id}>
                    <td>{i + 1}</td>
                    <td>{c.Genre_Name}</td>
                    <td>{c.status}</td>
                    <td>
                      <NavLink
                        to={`/add-genre/${c.id}`}
                        className="btn-edit me-2"
                      >
                        Edit
                      </NavLink>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(c.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No genres found.
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

export default GenreList;
