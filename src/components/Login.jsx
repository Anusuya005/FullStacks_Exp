import { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Viewer");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.trim() === "") {
      alert("Please enter a username.");
      return;
    }

    if (password !== "12345") {
      alert("Invalid password.");
      return;
    }

    onLogin(username, role);
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <h1>RBAC Authentication System</h1>

        <p className="subtitle">
          Secure Login using JSON Web Token (JWT)
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Username</label>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Select Role</label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option>Admin</option>
              <option>Editor</option>
              <option>Viewer</option>
            </select>
          </div>

          <button type="submit" className="login-btn">
            Sign In
          </button>

        </form>

      </div>
    </div>
  );
}

export default Login;