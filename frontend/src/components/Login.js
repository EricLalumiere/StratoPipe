// frontend/src/components/Login.js
import React, { useState } from 'react';
import api from '../api/axiosInstance';
import { useHistory } from 'react-router-dom';

function Login() {
  const history = useHistory();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      //adjust the POST URL (/auth/login/) to match your Django view
      // (login_user endpoint).
      const { data } = await api.post("http://localhost:8000/api/auth/login/", credentials);
      // Expecting { token: string, user: { … } }
      localStorage.setItem('authToken', data.token);
      // Optional: store user info
      localStorage.setItem('currentUser', JSON.stringify(data.user));
      history.push('/projects');  // or your protected route
    } catch (err) {
      setError(err.response?.data || 'Login failed');
    }
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
      {error && <div className="error">{JSON.stringify(error)}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default Login;
