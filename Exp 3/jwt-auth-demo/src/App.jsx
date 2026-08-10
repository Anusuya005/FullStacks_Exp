import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { generateMockToken, decodeToken } from "./utils/auth";

import AdminPage from "./pages/AdminPage";
import EditorPage from "./pages/EditorPage";
import ViewerPage from "./pages/ViewerPage";
import Unauthorized from "./pages/Unauthorized";

import "./App.css";

function App() {
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(token ? decodeToken(token) : null);

  const login = (username, role) => {
    const token = generateMockToken(username, role);
    setUser(decodeToken(token));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={login} />;
  }

  // Decide the dashboard based on the role
  let dashboardRoute = "/viewer";

  if (user.role === "Admin") {
    dashboardRoute = "/admin";
  } else if (user.role === "Editor") {
    dashboardRoute = "/editor";
  }

  return (
    <BrowserRouter>
      <div className="app-container">

        <header className="header">

          <div>
            <h1>Role-Based Access Control</h1>
            <p>JWT Authentication Demonstration</p>
          </div>

          <div className="user-info">

            <p><strong>User:</strong> {user.username}</p>

            <p><strong>Role:</strong> {user.role}</p>

            <button onClick={logout}>
              Logout
            </button>

          </div>

        </header>

        <main className="content">

          <Routes>

            <Route
              path="/"
              element={<Navigate to={dashboardRoute} replace />}
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute
                  user={user}
                  allowedRoles={["Admin"]}
                >
                  <AdminPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/editor"
              element={
                <ProtectedRoute
                  user={user}
                  allowedRoles={["Admin", "Editor"]}
                >
                  <EditorPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/viewer"
              element={
                <ProtectedRoute
                  user={user}
                  allowedRoles={["Admin", "Editor", "Viewer"]}
                >
                  <ViewerPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/unauthorized"
              element={<Unauthorized />}
            />

          </Routes>

        </main>

        <footer className="footer">
          Full Stack-II Lab | Experiment 1.3.2 | Role-Based Access Control using JWT
        </footer>

      </div>
    </BrowserRouter>
  );
}

export default App;