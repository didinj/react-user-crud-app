import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import api from "./api";

function Home({ users, onEdit, onSuccess }) {
  return (
    <div>
      <UserList users={users} onEdit={onEdit} onSuccess={onSuccess} />
    </div>
  );
}

Home.propTypes = {
  users: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired
};

function ManageUsers({ selectedUser, onSuccess }) {
  return (
    <div>
      <UserForm selectedUser={selectedUser} onSuccess={onSuccess} />
    </div>
  );
}

ManageUsers.propTypes = {
  selectedUser: PropTypes.object,
  onSuccess: PropTypes.func.isRequired
};

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const res = await api.get("");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSuccess = () => {
    fetchUsers();
    setSelectedUser(null);
  };

  const handleEdit = user => {
    setSelectedUser(user);
    navigate("/manage");
  };

  return (
    <div style={{ padding: "20px" }}>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ marginRight: "10px" }}>
          Home
        </Link>
        <Link to="/manage">Add/Edit User</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <Home users={users} onEdit={handleEdit} onSuccess={handleSuccess} />
          }
        />
        <Route
          path="/manage"
          element={
            <ManageUsers
              selectedUser={selectedUser}
              onSuccess={handleSuccess}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
