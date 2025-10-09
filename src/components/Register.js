import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import '../style/register.css'

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
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
      const res = await axios.post("http://localhost:5000/api/auth/register", form);
      
      console.log("✅ Registration successful:", res.data);
      
      setMessage(res.data.message);
      setForm({ username: "", email: "", password: "" }); // clear form
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (err) {
      console.error("❌ Registration error:", err);
      setMessage(err.response?.data?.error || "Error occurred"); // <-- correctly handle error in React
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = () => {
    navigate('/');
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Create Account</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="username"
            placeholder="username"
            value={form.username}
            onChange={handleChange}
            className="register-input"
            required
            disabled={loading}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="register-input"
            required
            disabled={loading}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="register-input"
            required
            minLength="6"
            disabled={loading}
          />
          <button type="submit" className="register-button" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        {message && (
          <p className={`register-message ${message.includes('success') ? 'success' : 'error'}`}>
            {message}
          </p>
        )}
        
        <div className="login-link">
          <p>Already have an account?</p>
          <button onClick={handleLoginClick} className="login-button">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
