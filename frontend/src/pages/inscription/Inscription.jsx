/* eslint-disable no-useless-escape */
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import styles from "./inscription.module.css";
import Donnees from "./DonneesFormulaire";

import "react-toastify/dist/ReactToastify.css";

function Inscription() {
  const donnees = Donnees();
  const navigate = useNavigate();
  const ranges = [
    {
      value: "pseudo",
      state: donnees.pseudo,
      text: "Pseudo",
      function: donnees.handleChangePseudo,
      small: donnees.falsePseudo,
    },
    {
      value: "firstname",
      state: donnees.firstname,
      text: "Prénom",
      function: donnees.handleChangeFirstname,
      small: donnees.falseFirstname,
    },
    {
      value: "lastname",
      state: donnees.lastname,
      text: "Nom de famille",
      function: donnees.handleChangeLastname,
      small: donnees.falseLastname,
    },
    {
      value: "email",
      state: donnees.email,
      text: "Email",
      function: donnees.handleChangeEmail,
      small: donnees.falseEmail,
    },
    {
      value: "password",
      state: donnees.password,
      text: "Mot de passe",
      function: donnees.handleChangePassword,
      small: donnees.falsePassword,
    },
    {
      value: "confirmePassword",
      state: donnees.confirmPassword,
      text: "Confirmez votre mot de passe",
      function: donnees.handleChangeConfirmPassword,
      small: donnees.falseConfirmPassword,
    },
  ];

  const notifyError = () =>
    toast("Une erreur est survenue", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Appel à l'API pour créer un nouvel utilisateur
      const response = await fetch("http://localhost:3310/api/users", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pseudo: donnees.pseudo,
          firstname: donnees.firstname,
          lastname: donnees.lastname,
          mail: donnees.email,
          password: donnees.confirmPassword,
        }),
      });

      if (response.status === 201) {
        navigate("/connexion");
      } else {
        notifyError();
      }
    } catch (err) {
      // Log des erreurs possibles
      console.error(err);
    }
  };

  return (
    <div className={styles.inscription}>
      <div className={styles.inscription__mainElement}>
        <img
          className={styles.inscription__mainElement__desktopImg}
          src="./src/assets/image-login.jpg"
          alt=""
        />
        <img
          className={styles.inscription__mainElement__mobileImg}
          src="./src/assets/logop3.svg"
          alt=""
        />

        <div className={styles.inscription__mainElement__formConteneur}>
          <h1 className={styles.inscription__mainElement__formConteneur__title}>
            Inscrivez vous
          </h1>
          <form
            action=""
            method="post"
            className={
              styles.inscription__mainElement__formConteneur__formulaire
            }
          >
            {ranges.map((e) => (
              <div
                className={
                  styles.inscription__mainElement__formConteneur__formulaire__range
                }
              >
                <label htmlFor={e.value}>{e.text}</label>
                <input
                  type={
                    e.value === "password" || e.value === "confirmePassword"
                      ? "password"
                      : "text"
                  }
                  name={e.value}
                  id={e.value}
                  value={e.state}
                  onChange={e.function}
                  required
                />
                {e.small}
              </div>
            ))}
            <div
              className={
                styles.inscription__mainElement__formConteneur__formulaire__range
              }
            >
              <button
                className={
                  styles.inscription__mainElement__formConteneur__formulaire__button
                }
                type="submit"
                onClick={handleSubmit}
                disabled={
                  ranges[0].state === "" ||
                  ranges[1].state === "" ||
                  ranges[2].state === "" ||
                  ranges[3].state === "" ||
                  ranges[4].state === "" ||
                  ranges[5].state === ""
                }
              >
                Inscription
              </button>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Inscription;
