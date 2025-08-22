// frontend/src/components/Register.js

import React, { useState } from 'react';
import api from '../api/axiosInstance';
import { useHistory } from 'react-router-dom';

function Register() {
  const history = useHistory();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // TODO Adjust the POST URL (/auth/register/) to match your Django router
      // (e.g. /authentication/users/ or /auth/users/).
      await api.post("http://localhost:8000/api/auth/register/", form);
      // On success, redirect to login
      history.push('/login');
    } catch (err) {
      setError(err.response?.data || 'Registration failed');
    }
  };

  return (
    <div className="auth-form">
      <h2>Register</h2>
      {error && <div className="error">{JSON.stringify(error)}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default Register;
