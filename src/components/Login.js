import logo from '../images/logo.svg';
function Login() {
  return (
    <>
      <div className="sign">
        <div className="sign__wrapper">
          <div className="sign__circle">
            <img src={logo}></img>
          </div>
          <div className="sign__title">Рады видеть!</div>
          <div className="sign__input">
            <div className="sign__input-title">E-mail</div>
            <input className="sign__input-field"></input>
          </div>
          <div className="sign__input">
            <div className="sign__input-title">Пароль</div>
            <input className="sign__input-field"></input>
          </div>
          <button className="sign__button">Войти</button>
          <div className="sign__alt-var">
            <div className="sign__question">Ещё не зарегистрированы?</div>
            <button className="sign__question-button">Регистрация</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
