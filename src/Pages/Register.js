import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

const Register = () => {
  let history = useNavigate();
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState({ show: false, type: "", msg: "" });

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  // input change
  const handleChange = (e) => {
    //
    setData({ ...data, [e.target.name]: e.target.value }); // ...data is to keep the previous data
    // console.log(data);
  };

  // submit form
  const submitForm = (e) => {
    e.preventDefault();

    // si les champs sont vides on affiche un message d'erreur et si l'email existe déjà on affiche un message d'erreur

    if (
      data.first_name === "" ||
      data.last_name === "" ||
      data.email === "" ||
      data.password === ""
    ) {
      showAlert(true, "danger", "Veuillez remplir tous les champs");
    } else if (
      data.password.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
      ) === null
    ) {
      showAlert(
        true,
        "danger",
        "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule et un chiffre"
      );
    } else if (
      data.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) ===
      null
    ) {
      showAlert(true, "danger", "Veuillez entrer un email valide");
    } else {
      // si les champs sont remplis on envoie les données au serveur
      axios.post("http://localhost/back2/register.php", data).then((result) => {
        console.log(result.data);
        if (result.data.error) {
          showAlert(true, "danger", "Email déjà existant");
        } else {
          // resetInput();
          showAlert(true, "success", "Inscription réussie");
          setTimeout(() => {
            showAlert(false, "", "");
            history(`/login`);
          }, 2000);
        }
      });
    }
  };

  return (
    <div className="container-register">
      <h3>Register</h3>

      <form className="form" onSubmit={submitForm}>
        {alert.show && (
          <Alert type={alert.type} msg={alert.msg} removeAlert={showAlert} />
        )}
        <div className="form-control">
          <label htmlFor="first_name">first Name</label>
          <input
            type="text"
            id="first_name"
            onChange={handleChange}
            name="first_name"
            value={setData.first_name}
          />
        </div>
        <div className="form-control">
          <label htmlFor="last_name">last Name</label>
          <input
            type="text"
            id="last_name"
            onChange={handleChange}
            name="last_name"
            value={setData.last_name}
          />
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            onChange={handleChange}
            name="email" // name must be the same as the state
            value={setData.email}
            // setEmailError={setEmailError}
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={handleChange}
            name="password"
            value={setData.password}
          />
        </div>
        <button type="submit" className="btn">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
