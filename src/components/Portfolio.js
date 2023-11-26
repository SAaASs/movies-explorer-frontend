import face from '../images/pic__COLOR_pic.png';
import arrow from '../images/text__COLOR_font-main.svg';
import smallArrow from '../images/arrow_smol.svg';
import useWindowDimensions from '../utils/useWindowDimension';
function Portfolio() {
  const { width, height } = useWindowDimensions();
  return (
    <>
      <section className="portfolio">
        <div className="portfolio__title">Студент</div>
        <div className="portfolio__main">
          <div className="portfolio__text">
            <h2 className="portfolio__name">Виталий</h2>
            <h5 className="portfolio__role">Фронтенд-разработчик, 30 лет</h5>
            <p className="portfolio__description">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У
              меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
              бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
              Контур». После того, как прошёл курс по веб-разработке, начал
              заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <a
              target="_blank"
              href="https://github.com"
              className="portfolio__gh-link"
            >
              Github
            </a>
          </div>
          <img
            alt="vitaliy photo"
            className="portfolio__photo"
            src={face}
          ></img>
        </div>
        <div className="portfolio__links">
          <div className="portfolio__links-title">Портфолио</div>
          <div className="portfolio__list">
            <a
              target="_blank"
              href="https://github.com/SAaASs/first-project"
              className="portfolio__link"
            >
              Статичный сайт
              <img alt="link" src={width > 768 ? arrow : smallArrow}></img>
            </a>
            <a
              target="_blank"
              href="https://github.com/SAaASs/russian-travel"
              className="portfolio__link"
            >
              Адаптивный сайт
              <img alt="link" src={width > 768 ? arrow : smallArrow}></img>
            </a>
            <a
              target="_blank"
              href="https://sasdom.students.nomoredomainsrocks.ru"
              className="portfolio__link"
            >
              Одностраничное приложение
              <img alt="link" src={width > 768 ? arrow : smallArrow}></img>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Portfolio;
