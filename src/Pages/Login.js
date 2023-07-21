import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

const Login = ({ setAuth }) => {
  let navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  // const [users, setUsers] = useState({});
  const [alert, setAlert] = useState({ show: false, type: "", msg: "" });

  //reinitialiser input password
  const resetInput = () => {
    setUser({ email: "", password: "" });
  };

  // message d'alert
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  // input change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    resetInput();

    // connexion axios post ,  puis faut envoyer les données au serveur pour vérifier si l'utilisateur existe ou non dans la base de données et si le mot de passe est correct ou non
    axios.post("http://localhost/back2/login.php", user).then((result) => {
      console.log(result.data);

      if (result.data.first_name) {
        // si l'utilisateur existe
        console.log(result.status);
        // stocker les données de l'utilisateur dans le local storage
        window.localStorage.setItem("user", JSON.stringify(result.data));
        setAuth(result.data); // pour changer le state de l'utilisateur

        navigate(`/ajouter`);
      } else {
        showAlert(
          true,
          "danger",
          "l'adresse mail ou le mot de passe est incorrect"
        );
      }
    });
  };

  return (
    <div className="container-register">
      <h3>Login </h3>

      <form className="form" onSubmit={submitForm}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} />}
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={user.email} // pour réinitialiser le champ email
            // required
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            value={user.password}
          />
        </div>
        <button type="submit" className="btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
