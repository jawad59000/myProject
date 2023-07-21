import React, { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "../src/Pages/Home";
import Register from "../src/Pages/Register";
import Login from "../src/Pages/Login";
import Navbars from "./components/Navbars";
import ProtectedRoute from "./Pages/ProtectedRoute";
import Ajouter from "./Pages/Todolist";

const App = () => {
  const [auth, setAuth] = useState(
    JSON.parse(window.localStorage.getItem("user")) || ""
  );

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  // disparaite le bouton login quand on se login et affiche le bouton logout et le nom de l'utilisateur connecté

  return (
    <BrowserRouter>
      {/* nav */}
      {/* <Header /> */}

      <Navbars auth={auth} />
      <div className={darkMode ? "dark-mode" : "light-mode"}>
        <button onClick={handleDarkMode} className="dark-mode__toggle">
          {darkMode ? "Light Mode" : "Dark Mode"}
          {darkMode ? "🌞" : "🌚"}
        </button>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setAuth={setAuth} />} />

          <Route
            path="/ajouter"
            element={
              <ProtectedRoute auth={auth}>
                <Ajouter auth={auth} />
              </ProtectedRoute>
            }
          />
          {/* <Route path="/logout" element={<Logout />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
