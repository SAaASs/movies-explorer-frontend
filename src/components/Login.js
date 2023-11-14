import logo from '../images/logo.svg';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/MainApi';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [isEmailBad, setIsEmailBad] = React.useState(false);
  const [isPasswordBad, setIsPasswordBad] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const currentUser = useContext(CurrentUserContext);
  return (
    <>
      <main className="sign">
        <div className="sign__wrapper">
          <div className="sign__circle">
            <img alt={'movies explorer'} src={logo}></img>
          </div>
          <div className="sign__title">Рады видеть!</div>
          <form
            className="sign__form"
            onSubmit={(e) => {
              e.preventDefault();
              console.log(e.target[0].value, e.target[1].value);
              api
                .LoginMe(e.target[0].value, e.target[1].value)
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

                  navigate('/');
                });
            }}
          >
            <div className="sign__input">
              <div className="sign__input-title">E-mail</div>
              <input
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
                className="sign__input-field"
              ></input>
              {isEmailBad && (
                <span className="sign__input-err">Некорректный email</span>
              )}
            </div>
            <div className="sign__input">
              <div className="sign__input-title">Пароль</div>
              <input
                value={password}
                onInput={(e) => {
                  setPassword(e.target.value);
                  if (
                    String(e.target.value)
                      .toLowerCase()
                      .match(
                        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
                      )
                  ) {
                    setIsPasswordBad(false);
                  } else {
                    setIsPasswordBad(true);
                  }
                }}
                type="password"
                className="sign__input-field"
              ></input>
              {isPasswordBad && (
                <span className="sign__input-err">
                  Пароль должен быть 6-16 символов и иметь спец символ
                </span>
              )}
            </div>
            <button
              type="submit"
              disabled={!(!isEmailBad & !isPasswordBad)}
              className="sign__button"
            >
              Войти
            </button>
          </form>

          <div className="sign__alt-var">
            <div className="sign__question">Ещё не зарегистрированы?</div>
            <button
              className="sign__question-button"
              onClick={() => {
                navigate('/sign-up');
              }}
            >
              Регистрация
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;
