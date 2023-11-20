import Header from './Header';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext } from 'react';
import { api } from '../utils/MainApi';
import React from 'react';
function Profile() {
  const currentUser = useContext(CurrentUserContext);

  const [email, setEmail] = React.useState(currentUser.currentUser.email);
  const [isEmailBad, setIsEmailBad] = React.useState(false);
  const [isNameBad, setIsNameBad] = React.useState(false);
  const [name, setName] = React.useState(currentUser.currentUser.name);
  console.log();
  React.useEffect(() => {
    setEmail(currentUser.currentUser.email);
    setName(currentUser.currentUser.name);
  }, [currentUser.currentUser]);
  return (
    <>
      <Header></Header>
      <section className="profile">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            api
              .PatchMe(e.target[0].value, e.target[1].value)
              .then((res) => {
                currentUser.setCurrentUser(res);
                alert('Ваш профиль обновлен');
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          <div className="profile__upper">
            <h2 className="profile__greeting">
              Привет, {currentUser.currentUser.name}!
            </h2>
            <div className="profile__input-wrapper">
              <p className="profile__input-name">Имя</p>
              <input
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
                type="text"
                value={name}
                className="profile__input"
              ></input>
              {isNameBad && (
                <span className="sign__input-err">
                  Длиина имени - от 2 до 40 символов
                </span>
              )}
            </div>
            <div className="profile__input-wrapper">
              <p className="profile__input-name">Почта</p>
              <input
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
                type="text"
                value={email}
                className="profile__input"
              ></input>
              {isEmailBad && (
                <span className="sign__input-err">Некорректный email</span>
              )}
            </div>
          </div>
          <div className="profile__lower">
            <button
              disabled={
                !(!isEmailBad & !isNameBad) ||
                (name == currentUser.currentUser.name) &
                  (email == currentUser.currentUser.email)
              }
              type="submit"
              className="profile__edit"
            >
              Редактировать
            </button>
            <button
              onClick={() => {
                currentUser.setCurrentUser({
                  name: '',
                  email: '',
                });
                localStorage.removeItem('movExpToken');
              }}
              className="profile__logout"
            >
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Profile;
