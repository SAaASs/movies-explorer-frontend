function Footer() {
  return (
    <>
      <footer className="footer">
        <h4 className="footer__description">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h4>
        <div className="footer__credits">
          <h5 className="footer__year">© 2020</h5>
          <div className="footer__links">
            <a
              target="_blank"
              href="https://practicum.yandex.ru"
              className="footer__link"
            >
              Яндекс.Практикум
            </a>
            <a
              target="_blank"
              href="https://github.com"
              className="footer__link"
            >
              Github
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
