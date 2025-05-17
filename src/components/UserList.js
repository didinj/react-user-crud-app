import React from "react";
import PropTypes from "prop-types";
import api from "../api";

export default function UserList({ users, onEdit, onSuccess }) {
  const handleDelete = async id => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await api.delete(`/${id}`);
      onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user =>
          <tr key={user.id}>
            <td>
              {user.name}
            </td>
            <td>
              {user.email}
            </td>
            <td>
              <button onClick={() => onEdit(user)}>Edit</button>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired
};
