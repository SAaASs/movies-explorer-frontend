import logo from '../images/logo.svg';
function Register() {
  return (
    <>
      <main className="sign">
        <div className="sign__wrapper">
          <div className="sign__circle">
            <img src={logo}></img>
          </div>
          <div className="sign__title">Добро пожаловать!</div>
          <div className="sign__input">
            <div className="sign__input-title">Имя</div>
            <input className="sign__input-field"></input>
          </div>
          <div className="sign__input">
            <div className="sign__input-title">E-mail</div>
            <input className="sign__input-field"></input>
          </div>
          <div className="sign__input">
            <div className="sign__input-title">Пароль</div>
            <input className="sign__input-field"></input>
          </div>
          <button className="sign__button">Зарегистрироваться</button>
          <div className="sign__alt-var">
            <div className="sign__question">Уже зарегистрированы?</div>
            <button className="sign__question-button">Войти</button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Register;
