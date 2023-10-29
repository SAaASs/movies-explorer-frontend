import profile from '../images/icon__COLOR_icon-main.svg';
import { useNavigate } from 'react-router-dom';
function BurgerMenu({ setIsMenuActive }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="burger-menu__wrapper">
        <section className="burger-menu">
          <div className="burger-menu__header">
            <button
              className="burger-menu__close-button"
              onClick={() => {
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
                navigate('/movies');
              }}
              className="burger-menu__list-button"
            >
              Сохраненные фильмы
            </button>
          </div>
          <button
            onClick={() => {
              navigate('/profile');
            }}
            className="header__account-button header_white"
          >
            Аккаунт{' '}
            <div className="header__circle">
              <img src={profile}></img>
            </div>
          </button>
        </section>
      </div>
    </>
  );
}

export default BurgerMenu;
