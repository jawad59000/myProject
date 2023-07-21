import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//     ? localStorage.getItem("userName")

const Navbar = ({ auth }) => {
  const [isMobile, setIsmobile] = useState(false);
  const [user, setUser] = useState("");
  let navigate = useNavigate();
  const LogOut = () => {
    localStorage.clear(); // Clear All Local Storage
    navigate(`/`); // Navigate to home Page
    setUser(auth.first_name("")); // Set User Name to Empty
  };

  return (
    <header>
      <nav className="navbar">
        <Link to="/">
          <h3 className="logo">TODOLIST</h3>
        </Link>
        <ul
          className={isMobile ? "nav-links-mobile" : "nav-links"} // show-nav
          onClick={() => setIsmobile(false)}
        >
          {/* <ul className="nav-links"> */}
          <Link to="/" className="home">
            <li>Home</li>
          </Link>
          {/* si l'utilisateur est connecté on cache le bouton register et si il
          n'est pas connecté on affiche register */}
          {/* si l'utilisateur est authentifié on affiche le ajouter */}
          {auth ? (
            <Link to="/ajouter" className="ajouter">
              <li>Todolist</li>
            </Link>
          ) : (
            "" // si l'utilisateur n'est pas authentifié on affiche rien
          )}

          {!auth && (
            <Link to="/register" className="register">
              <li>Register</li>
            </Link>
          )}

          {/* si l'utilisateur est connecté on enlève le bouton login / si l'utilisateur n'est pas connecté on affiche le bouton login */}
          {!auth && (
            <Link to="/login" className="login">
              <li>Login</li>
            </Link>
          )}

          {/* si l'utilisateur est connecté on affiche son userName et on retire notre login*/}
          {auth && (
            <span className="logout">
              <div className="user">
                <Link to="" className="Logout" onClick={LogOut}>
                  <li>Logout</li>
                </Link>
              </div>
            </span>
          )}
        </ul>

        <button
          className="mobile-menu-icon"
          onClick={() => setIsmobile(!isMobile)} // Toggle Mobile Menu
        >
          {isMobile ? (
            <i className="fas fa-times"></i>
          ) : (
            <i className="fas fa-bars"></i>
          )}
        </button>
      </nav>
      <div className="bar"></div>
    </header>
  );
};

export default Navbar;
