function RegistrationInput({
  login,
  onLoginChange,
  password,
  onPasswordChange,
  confirmPassword,
  onConfirmPasswordChange,
  isRegisterMode,
}) {
  return (
    <>
      <input
        type="text"
        className="input"
        placeholder="Логин"
        value={login}
        onChange={(e) => onLoginChange(e.target.value)}
      />
      <input
        type="password"
         className="input"
        placeholder="Пароль"
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
      />
      {isRegisterMode && (
        <input
          type="password"
           className="input"
          placeholder="Подтверждение пароля"
          value={confirmPassword}
          onChange={(e) => onConfirmPasswordChange(e.target.value)}
        />
      )}
    </>
  );
}

export default RegistrationInput;