import webPlanet from '../images/text__COLOR_landing-logo.svg';
import useWindowDimensions from '../utils/useWindowDimension';
function Title() {
  const { height, width } = useWindowDimensions();
  console.log(width);
  return (
    <>
      <section className="title">
        <div className="title__wrapper">
          <div className="title__text">
            <h2 className="title__text-title">
              Учебный проект студента факультета{width > 1024 && <br></br>}{' '}
              Веб-разработки.
            </h2>
            <h3 className="title__text-subtitle">
              Листайте ниже, чтобы узнать больше про этот проект и его
              создателя.
            </h3>
          </div>
          <img src={webPlanet} className="title__web-image"></img>
        </div>
        <button className="title__know-more">Узнать больше</button>
      </section>
    </>
  );
}

export default Title;
