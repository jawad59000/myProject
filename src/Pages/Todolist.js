import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Alert from "../components/Alert";
import { FaEdit, FaTrash } from "react-icons/fa";
const url = "http://localhost/back2/";

const Ajouter = ({ auth }) => {
  const [allTask, setAllTask] = useState([]);
  const [task, setTask] = useState("");
  const [alert, setAlert] = useState({ show: false, type: "", msg: "" });
  const [editID, setEditID] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // const [title, setTitle] = useState("");

  // message d'alert
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const fetchAsk = async () => {
    const { data } = await axios(`${url}read.php?id=${auth.user_id}`);
    setAllTask(data);
  };

  useEffect(() => {
    fetchAsk();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task || task.trim() === "") {
      showAlert(true, "danger", "Veuillez entrer une tâche");
      setTask("");
    } else if (isEditing) {
      //edit
      //si on est en mode edit
      try {
        const person = {
          // user_id: parseInt(editID),
          // title: auth.user_id, //
          task_id: parseInt(editID), // id de la tache
          title: task, // titre de la tache
          user_id: auth.user_id, // id de l'utilisateur
        };
        // parseInt() convertit une chaîne de caractères en nombre entier.
        await axios.post(`${url}edited.php`, person);

        showAlert(true, "success", "Tâche modifiée");
        setTask("");
        setEditID(null);
        fetchAsk();
        setIsEditing(false);
        console.log(person);
      } catch (error) {
        showAlert(true, "danger", "Erreur,essayez encore");
      }
    } else {
      try {
        // try to add a new person
        // const person = { task };
        const person = { title: task, user_id: auth.user_id };

        await axios.post(`${url}taskCreate.php`, person);
        showAlert(true, "success", "Nom ajouté");
        fetchAsk();
        setTask("");

        // console.log(person);
      } catch (error) {
        // eslint-disable-line
        showAlert(true, "danger", "Erreur,essayez encore");
      }
    }
  };
  const deleteTask = async (id) => {
    await axios.post(`${url}delete.php`, { task_id: id }); // id de la tache
    fetchAsk();
    setEditID(null);
    setIsEditing(false);
    showAlert(true, "danger", "valeur supprimée");

    console.log(id);
  };

  const AlldeleteTasks = async (id) => {
    await axios.post(`${url}clearall.php`, { user_id: id });

    fetchAsk();
    setEditID(null);
    setIsEditing(false);
    setAllTask([]);

    showAlert(true, "danger", "toutes les valeurs ont été supprimées");
  };

  const editTasks = async (id) => {
    await axios.post(`${url}edited.php`, {
      task_id: id,
      user_id: auth.user_id,
    });
    setEditID(id);
    const task = allTask.find((person) => person.task_id === id);
    console.log(task);
    setIsEditing(true);
    setTask(task.title); // recupere le nom de la tache dans l'input pour le modifier
    console.log(task.title);
  };

  return (
    <>
      <article>
        <h3>Welcom {auth.first_name}</h3>
        <form className="form" onSubmit={handleSubmit}>
          {alert.show && <Alert {...alert} removeAlert={showAlert} />}
          <div className="form-group">
            <label htmlFor="Tasks">
              <h3>Tâches : {allTask.length}</h3>
            </label>

            <input
              type="text"
              className="form-control"
              id="Tasks"
              placeholder="Enter Task"
              onChange={(e) => setTask(e.target.value)}
              value={task}
            />
          </div>
          <button type="submit" className="addTask">
            {isEditing ? "modifier la tâche" : "ajouter une tâche"}
          </button>
        </form>

        {/* <div className="HeaderTask">Tache</div> */}

        <table className="table">
          <tr>
            <th scope="col">Tâche</th>
            <th scope="col">modifier</th>
            <th scope="col">supprimer</th>
          </tr>
          {allTask.map((task) => {
            const { task_id, title } = task;
            return (
              <tr key={task_id} className="items">
                <td>{title}</td>
                <td>
                  <button
                    className="buttonEdit"
                    onClick={() => editTasks(task_id)}
                  >
                    {/* modifier */}
                    <FaEdit />
                  </button>
                </td>
                <td>
                  <button
                    className="buttonDelete"
                    onClick={() => deleteTask(task_id)}
                  >
                    {/* supprimer */}
                    <FaTrash />
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </article>
      <button
        className="deleteAll"
        style={
          // si on à plus d'un user on affiche le bouton sinon on le cache
          allTask.length > 0 ? { display: "block" } : { display: "none" }
        }
        onClick={() => AlldeleteTasks(auth.user_id)}
      >
        Supprimer toutes les tâches
      </button>
    </>
  );
};

export default Ajouter;
