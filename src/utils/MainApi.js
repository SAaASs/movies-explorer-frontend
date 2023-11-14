export class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  _checkResponse(res) {
    if (res.ok) {
      const resu = res.json();
      return resu;
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }
  RegMe(name, email, password) {
    return fetch(this._baseUrl + 'signup', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        password: password,
        email: email,
      }),
    }).then(this._checkResponse);
  }
  LoginMe(email, password) {
    return fetch(this._baseUrl + 'signin', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then(this._checkResponse);
  }
  getMe() {
    return fetch(this._baseUrl + 'users/me', {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkResponse);
  }
  getMyMovies() {
    return fetch(this._baseUrl + 'movies', {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkResponse);
  }
  PatchMe(name, email) {
    return fetch(this._baseUrl + 'users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        name: name,
      }),
    }).then(this._checkResponse);
  }
  LikeMovie(movie) {
    return fetch(this._baseUrl + 'movies', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: 'https://api.nomoreparties.co' + movie.image.url,
        trailerLink: movie.trailerLink,
        thumbnail: 'https://api.nomoreparties.co' + movie.image.url,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    }).then(this._checkResponse);
  }
  UnlikeMovie(movId) {
    return fetch(this._baseUrl + `movies/${movId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

export const api = new MainApi({
  baseUrl: 'http://localhost:3002/',
  headers: {
    'Content-Type': 'application/json',
  },
});
