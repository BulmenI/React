import RegistrationInput from "../components/RegistrationInput";
import AuthButtons from "../components/AuthButtons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/hooks";
import { useAuth } from "../context/AuthContext"; // импорт контекста

function RegisterPage() {
  const [mode, setMode] = useState("login");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [users, setUsers] = useLocalStorage("users", []); // массив зарегистрированных пользователей
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login: authLogin } = useAuth(); // метод для авторизации из контекста

  const handleRegister = () => {
    // Валидация
    if (!login.trim() || !password.trim() || password !== confirmPassword) {
      setError("Пароли не совпадают или поля пусты");
      return;
    }
    if (password.length < 6) {
      setError("Пароль должен быть не менее 6 символов");
      return;
    }

    // Проверка уникальности логина
    const userExists = users.some((u) => u.login === login);
    if (userExists) {
      setError("Пользователь с таким логином уже существует");
      return;
    }

    // Добавляем нового пользователя
    const newUser = { login, password };
    setUsers((prev) => [...prev, newUser]);

    // Авторизуем через контекст и редиректим
    authLogin(newUser);
    setError("");
    setLogin("");
    setPassword("");
    setConfirmPassword("");
    navigate("/");
  };

  const handleLogin = () => {
    if (!login.trim() || !password.trim()) {
      setError("Введите логин и пароль");
      return;
    }

    // Ищем пользователя
    const foundUser = users.find(
      (u) => u.login === login && u.password === password
    );
    if (!foundUser) {
      setError("Неверный логин или пароль");
      return;
    }

    // Авторизуем через контекст и редиректим
    authLogin(foundUser);
    setError("");
    setLogin("");
    setPassword("");
    setConfirmPassword("");
    navigate("/");
  };

  const handleSubmit = () => {
    setError(""); // сбрасываем предыдущую ошибку
    if (mode === "register") {
      handleRegister();
    } else {
      handleLogin();
    }
  };

  const onSwitchMode = () => {
    setMode((prev) => (prev === "login" ? "register" : "login"));
    setError(""); // сбрасываем ошибку при переключении
  };

  return (
    <div>
      <h2
      className="header--main"
      >{mode === "login" ? "Вход" : "Регистрация"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <RegistrationInput
        login={login}
        password={password}
        confirmPassword={confirmPassword}
        onLoginChange={setLogin}
        onPasswordChange={setPassword}
        onConfirmPasswordChange={setConfirmPassword}
        isRegisterMode={mode === "register"}
      />
      <AuthButtons
        mode={mode}
        onSwitchMode={onSwitchMode}
        onSubmit={handleSubmit}
        isSubmitDisabled={
          mode === "register"
            ? !login || !password || !confirmPassword || password !== confirmPassword || password.length < 6
            : !login || !password
        }
      />
    </div>
  );
}

export default RegisterPage;