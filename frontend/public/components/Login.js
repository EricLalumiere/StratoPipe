import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false); // Add loading state for user feedback
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when the request starts
        setMessage(""); // Clear previous messages
        try {
            const response = await axios.post(
                "http://localhost:8000/api/auth/login/",
                credentials,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );
            setMessage("Login successful!");
            localStorage.setItem("username", response.data.username); // Save username locally
            navigate("/project-management"); // Redirect to the project management page
        } catch (error) {
            setMessage(
                error.response?.data?.error || "Login failed. Please try again."
            );
        } finally {
            setLoading(false); // Reset loading state after request is complete
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
            {message && <p className={message.includes("successful") ? "success" : "error"}>{message}</p>}
        </div>
    );
};

export default Login;
