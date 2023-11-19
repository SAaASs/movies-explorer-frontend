import logo from '../images/logo.svg';
import { useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import { api } from '../utils/MainApi';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [isEmailBad, setIsEmailBad] = React.useState(true);
  const [isPasswordBad, setIsPasswordBad] = React.useState(true);
  const [password, setPassword] = React.useState('');
  const [isNameBad, setIsNameBad] = React.useState(true);
  const [name, setName] = React.useState('');
  const currentUser = useContext(CurrentUserContext);
  return (
    <>
      <main className="sign">
        <div className="sign__wrapper">
          <div className="sign__circle">
            <img src={logo}></img>
          </div>
          <div className="sign__title">Добро пожаловать!</div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              api
                .RegMe(e.target[0].value, e.target[1].value, e.target[2].value)
                .then((res) => {
                  return api.LoginMe(e.target[1].value, e.target[2].value);
                })
                .then((res) => {
                  console.log(currentUser);
                  api._headers = {
                    'Content-Type': 'application/json',
                    authorisation: res.token,
                  };
                  localStorage.setItem('movExpToken', res.token);
                  return api.getMe();
                })
                .then((res) => {
                  console.log(res);
                  currentUser.setCurrentUser(res);

                  navigate('/movies');
                });
            }}
            className="sign__form"
          >
            <div className="sign__input">
              <div className="sign__input-title">Имя</div>
              <input
                className="sign__input-field"
                onInput={(e) => {
                  setName(e.target.value);
                  if (
                    String(e.target.value)
                      .toLowerCase()
                      .match(/^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-']{2,40}$/)
                  ) {
                    setIsNameBad(false);
                  } else {
                    setIsNameBad(true);
                  }
                }}
                value={name}
              ></input>
              {isNameBad && (
                <span className="sign__input-err">
                  Длиина имени - от 2 до 40 символов
                </span>
              )}
            </div>
            <div className="sign__input">
              <div className="sign__input-title">E-mail</div>
              <input
                className="sign__input-field"
                value={email}
                onInput={(e) => {
                  setEmail(e.target.value);
                  if (
                    String(e.target.value)
                      .toLowerCase()
                      .match(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                      )
                  ) {
                    setIsEmailBad(false);
                  } else {
                    setIsEmailBad(true);
                  }
                }}
              ></input>
              {isEmailBad && (
                <span className="sign__input-err">Некорректный email</span>
              )}
            </div>
            <div className="sign__input">
              <div className="sign__input-title">Пароль</div>
              <input
                className="sign__input-field"
                value={password}
                onInput={(e) => {
                  setPassword(e.target.value);
                  if (
                    String(e.target.value)
                      .toLowerCase()
                      .match(
                        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/
                      )
                  ) {
                    setIsPasswordBad(false);
                  } else {
                    setIsPasswordBad(true);
                  }
                }}
                type="password"
              ></input>
              {isPasswordBad && (
                <span className="sign__input-err">
                  Пароль должен содержать не менее 8 символов и иметь спец
                  символ
                </span>
              )}
            </div>
            <button
              type="submit"
              disabled={!(!isEmailBad & !isPasswordBad & !isNameBad)}
              className="sign__button"
            >
              Зарегистрироваться
            </button>
          </form>

          <div className="sign__alt-var">
            <div className="sign__question">Уже зарегистрированы?</div>
            <button
              className="sign__question-button"
              onClick={() => {
                navigate('/sign-in');
              }}
            >
              Войти
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Register;
