import logo from '../images/logo.svg';
import profile from '../images/icon__COLOR_icon-main.svg';
import useWindowDimensions from '../utils/useWindowDimension';
import BurgerMenu from './BurgerMenu';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
function Header({ location }) {
  const { height, width } = useWindowDimensions();
  const [isMenuActive, setIsMenuActive] = useState(false);
  const navigate = useNavigate();
  const currentUser = useContext(CurrentUserContext);
  return (
    <>
      <header className={location == '/' ? 'header' : 'header header_white'}>
        <div className="header__wrapper">
          <img
            alt={'movies explorer'}
            className="header__logo"
            onClick={() => {
              navigate('/');
            }}
            src={logo}
          ></img>
          {width > 1024 && currentUser.currentUser.name != '' && (
            <div className="header__movies-buttons">
              <button
                onClick={() => {
                  navigate('/movies');
                }}
                className={
                  location == '/'
                    ? 'header__movies-button'
                    : 'header__movies-button header__movies-button_black'
                }
              >
                Фильмы
              </button>
              <button
                onClick={() => {
                  navigate('/saved-movies');
                }}
                className={
                  location == '/'
                    ? 'header__movies-button'
                    : 'header__movies-button header__movies-button_black'
                }
              >
                Сохраненные фильмы
              </button>
            </div>
          )}
          {width > 1024 ? (
            currentUser.currentUser.name != '' ? (
              <button
                onClick={() => {
                  navigate('/profile');
                }}
                className={
                  location == '/'
                    ? 'header__account-button'
                    : 'header__account-button header__account-button_white'
                }
              >
                Аккаунт <img alt={'movies explorer avatar'} src={profile}></img>
              </button>
            ) : (
              <div className="header__sign">
                <button
                  onClick={() => {
                    navigate('/sign-up');
                  }}
                  className="header__sign-up"
                >
                  Регистрация
                </button>
                <button
                  onClick={() => {
                    navigate('/sign-in');
                  }}
                  className="header__sign-in"
                >
                  Войти
                </button>
              </div>
            )
          ) : (
            <button
              onClick={() => {
                setIsMenuActive(true);
                document
                  .querySelector('body')
                  .classList.toggle('page_overflowed');
              }}
              className="header__burger-button"
            ></button>
          )}
        </div>
      </header>
      {isMenuActive && (
        <BurgerMenu setIsMenuActive={setIsMenuActive}></BurgerMenu>
      )}
    </>
  );
}

export default Header;
