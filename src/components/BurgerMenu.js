import profile from '../images/icon__COLOR_icon-main.svg';
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext } from 'react';
function BurgerMenu({ setIsMenuActive }) {
  const navigate = useNavigate();
  const currentUser = useContext(CurrentUserContext);
  console.log(currentUser.currentUser.name);
  return (
    <>
      <div className="burger-menu__wrapper">
        <section className="burger-menu">
          <div className="burger-menu__header">
            <button
              className="burger-menu__close-button"
              onClick={() => {
                document
                  .querySelector('body')
                  .classList.toggle('page_overflowed');
                setIsMenuActive(false);
              }}
            ></button>
          </div>
          <div className="burger-menu__list">
            <button
              onClick={() => {
                navigate('/');
              }}
              className="burger-menu__list-button"
            >
              Главная
            </button>
            {currentUser.currentUser.name != '' ? (
              <>
                <button
                  onClick={() => {
                    navigate('/movies');
                  }}
                  className="burger-menu__list-button"
                >
                  Фильмы
                </button>
                <button
                  onClick={() => {
                    navigate('/saved-movies');
                  }}
                  className="burger-menu__list-button"
                >
                  Сохраненные фильмы
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate('/sign-in');
                  }}
                  className="burger-menu__list-button"
                >
                  Войти
                </button>
                <button
                  onClick={() => {
                    navigate('/sign-up');
                  }}
                  className="burger-menu__list-button"
                >
                  Регистрация
                </button>
              </>
            )}
          </div>
          {currentUser.currentUser.name != '' && (
            <button
              onClick={() => {
                navigate('/profile');
              }}
              className="header__account-button header_white"
            >
              Аккаунт <img alt={'movies explorer'} src={profile}></img>
            </button>
          )}
        </section>
      </div>
    </>
  );
}

export default BurgerMenu;
