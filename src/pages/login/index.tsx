import React, { FormEvent, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Fab,
  Snackbar,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import axios from "axios";
import { UserI } from "../../utils/types";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { GoMoon, GoSun } from "react-icons/go";
import styles from "./styles.module.scss";
import bgImage from "/undraw_undraw_undraw_undraw_undraw_notebook_ask4_ew5s_-1-_954q_-1-_yoow_-1-_n5mm.svg";
import avatar from "/undraw_female_avatar_efig.svg";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const Login: React.FC = () => {
  const [user, setUser] = useState<UserI>();
  const [alert, setAlert] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleAuth = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/auth/login",
        { email: user?.email, password: user?.password }
      );
      Cookies.set("token", response.data.access_token);
      navigate("/todo");
    } catch (error) {
      setAlert(true);
      console.log(error);
    }
  };

  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? (storedTheme as "light" | "dark") : "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === "dark" ? "light" : "dark");
  };

  const handleAlertClose = () => setAlert(false);

  return (
    <ThemeProvider theme={currentTheme === "dark" ? darkTheme : lightTheme}>
      <main className={currentTheme === "dark" ? styles.darkMain : styles.main}>
        <Fab
          color="secondary"
          aria-label="add"
          size="medium"
          className={styles.fab}
          onClick={toggleTheme}
        >
          {currentTheme === "light" ? (
            <GoMoon size={20} />
          ) : (
            <GoSun size={20} />
          )}
        </Fab>
        <Snackbar
          open={alert}
          onClose={handleAlertClose}
          autoHideDuration={4000}
        >
          <Alert onClick={handleAlertClose} severity="error" aria-label="close">
            Credenciais inválidas
          </Alert>
        </Snackbar>
        <div className={styles.div1}>
          <img src={bgImage} className={styles.bgImage} />
        </div>

        <div className={styles.div2}>
          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <img src={avatar} className={styles.avatar} />
              <h3>Login - To-do List</h3>
            </div>
            <form className={styles.form} onSubmit={handleAuth}>
              <TextField
                required
                label="Email"
                variant="filled"
                size="small"
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
                }}
              />
              <TextField
                required
                type="password"
                label="Senha"
                variant="filled"
                size="small"
                rows={5}
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                }}
              />
              <Button variant="contained" color="secondary" type="submit">
                Entar
              </Button>
            </form>
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
};

export default Login;
