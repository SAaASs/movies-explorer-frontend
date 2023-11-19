import Header from './Header';
function Profile() {
  return (
    <>
      <Header></Header>
      <section className="profile">
        <div className="profile__upper">
          <h2 className="profile__greeting">Привет, Виталий!</h2>
          <div className="profile__input-wrapper">
            <p className="profile__input-name">Имя</p>
            <input
              type="text"
              placeholder="Виталий"
              className="profile__input"
            ></input>
          </div>
          <div className="profile__input-wrapper">
            <p className="profile__input-name">Почта</p>
            <input
              type="text"
              placeholder="pochta@yandex.ru"
              className="profile__input"
            ></input>
          </div>
        </div>
        <div className="profile__lower">
          <button className="profile__edit">Редактировать</button>
          <button className="profile__logout">Выйти из аккаунта</button>
        </div>
      </section>
    </>
  );
}

export default Profile;
