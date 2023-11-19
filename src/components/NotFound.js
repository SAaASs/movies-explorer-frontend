import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <div className="not-found">
        <div className="not-found__main">
          <h2 className="not-found__main-title">404</h2>
          <h4 className="not-found__main-subtitle">Страница не найдена</h4>
        </div>
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="not-found__back-button"
        >
          Назад
        </button>
      </div>
    </>
  );
}

export default NotFound;
