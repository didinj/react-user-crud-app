import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function UserForm({ selectedUser, onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(
    () => {
      if (selectedUser) {
        setName(selectedUser.name);
        setEmail(selectedUser.email);
      } else {
        setName("");
        setEmail("");
      }
    },
    [selectedUser]
  );

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Invalid email format";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;

    const user = { name, email };
    try {
      if (selectedUser) {
        await api.put(`/${selectedUser.id}`, user);
      } else {
        await api.post("", user);
      }
      onSuccess();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <br />
        <input
          id="name"
          className="form-control"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        {errors.name &&
          <div style={{ color: "red" }}>
            {errors.name}
          </div>}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <br />
        <input
          id="email"
          className="form-control"
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {errors.email &&
          <div className="text-danger">
            {errors.email}
          </div>}
      </div>
      <button type="submit">
        {selectedUser ? "Update" : "Create"} User
      </button>
    </form>
  );
}

UserForm.propTypes = {
  selectedUser: PropTypes.object,
  onSuccess: PropTypes.func.isRequired
};
