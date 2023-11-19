import logo from '../images/logo.svg';
import profile from '../images/icon__COLOR_icon-main.svg';
import useWindowDimensions from '../utils/useWindowDimension';
import BurgerMenu from './BurgerMenu';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Header({ location }) {
  const { height, width } = useWindowDimensions();
  const [isMenuActive, setIsMenuActive] = useState(false);
  const navigate = useNavigate();
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
          {width > 1024 && (
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
                  navigate('/saved');
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
