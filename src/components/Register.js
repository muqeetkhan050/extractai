import React, { useState } from "react";

const Register = () => {
  // Step 2.1: Create state for form inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Step 2.2: Handle form submission
  const handleRegister = (e) => {
    e.preventDefault(); // prevent page reload
    // For now, just log the values
    console.log({ username, email, password });
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
