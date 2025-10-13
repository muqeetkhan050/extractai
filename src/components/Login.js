

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import '../style/Login.css'
const Login = ({ setIsAuthenticated }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      console.log("✅ Login successful:", res.data);

      // Save auth status in memory (not localStorage)
      sessionStorage.setItem("isAuthenticated", "true");
      sessionStorage.setItem("user", JSON.stringify(res.data.user));

      setIsAuthenticated(true);
      setMessage("Login successful!");
      navigate('/Main');

    } catch (err) {
      console.error("❌ Login error:", err);
      setMessage(err.response?.data?.error || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">Sign in to continue</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email" className="input-label">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="login-input"
              required
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password" className="input-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="login-input"
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? (
              <span className="button-content">
                <span className="spinner"></span>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {message && (
          <div className={`login-message ${message.includes('successful') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <div className="register-link">
          <p>Don't have an account?</p>
          <button onClick={handleRegisterClick} className="register-button">
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;