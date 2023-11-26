function About() {
  return (
    <>
      <section id="about" className="about">
        <h3 className="about__title">О проекте</h3>
        <div className="about__text">
          <div className="about__text-wrapper">
            <h3 className="about__text-title">
              Дипломный проект включал 5 этапов
            </h3>
            <h4 className="about__text-subtitle">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </h4>
          </div>
          <div className="about__text-wrapper">
            <h3 className="about__text-title">
              На выполнение диплома ушло 5 недель
            </h3>
            <h4 className="about__text-subtitle">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </h4>
          </div>
        </div>
        <div className="about__time-stripe">
          <div className="about__time-stripe-green">
            <p className="about__time-stripe-title">
              1 неделя
              <span className="about__time-stripe-subtitle">Back-end</span>
            </p>
          </div>
          <div className="about__time-stripe-white">
            <p className="about__time-stripe-title">
              4 недели
              <span className="about__time-stripe-subtitle">Front-end</span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
