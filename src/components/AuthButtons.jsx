function AuthButtons({
  mode,                   // 'login' или 'register'
  onSwitchMode,           // переключает режим
  onSubmit,               // основное действие (войти / зарегистрироваться)
   isSubmitDisabled,       // блокировка основной кнопки
}) {
  return (
    <div>
      <button
        onClick={onSubmit}
         disabled={isSubmitDisabled}
         className="button button--primary"
      >
        {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
      </button>
      <button onClick={onSwitchMode}
        className="button button--secondary"
      >
        {mode === 'login' ? 'Нет аккаунта? Регистрация' : 'Есть аккаунт? Войти'}
      </button>
    </div>
  );
}

export default AuthButtons;