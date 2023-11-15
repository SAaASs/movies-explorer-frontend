import React, { useRef } from 'react';
import MovieCard from './MovieCard';
import { useLocation } from 'react-router-dom';
import { movApi } from '../utils/MoviesApi';
import { api } from '../utils/MainApi';
import useWindowDimensions from '../utils/useWindowDimension';

function MoviesList() {
  const { height, width } = useWindowDimensions();
  const location = useLocation();
  const [howMuchCardsAdd, setHowMuchCardsAdd] = React.useState(4);
  const [CardsEdge, setCardsEdge] = React.useState(16);
  const [isSwitchActive, setIsSwitchActive] = React.useState(false);
  const allMovies = useRef(null);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [likedMovies, setLikedMovies] = React.useState([]);
  const [searchPrase, setSearchPhrase] = React.useState('*');

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchPhrase(e.target.value);
  };
  React.useEffect(() => {
    Promise.all([movApi.getAllMovies(), api.getMyMovies()]).then(
      ([all, likes]) => {
        allMovies.current = all;
        setFilteredMovies([...all]);
        setLikedMovies(likes.map((item) => item.movieId));
      }
    );
  }, [location]);

  React.useEffect(() => {
    if (width >= 1280) {
      setHowMuchCardsAdd(4);
    }
    if (width < 1280) {
      setHowMuchCardsAdd(2);
    }
  }, [width]);
  React.useEffect(() => {
    if (width >= 1280) {
      setCardsEdge(16);
    }
    if ((width < 1280) & (width >= 768)) {
      setCardsEdge(8);
    }
    if (width < 768) {
      setCardsEdge(5);
    }
  }, []);

  console.log('>> likedMovies', likedMovies);
  return (
    <>
      <main className="main">
        <section className="control-panel">
          <form onSubmit={handleSearchChange} className="control-panel__upper">
            <input
              placeholder="Фильмы"
              className="control-panel__title"
              value={searchPrase}
            ></input>
            <button type="submit" className="control-panel__search-button">
              Найти
            </button>
          </form>
          <div className="control-panel__bottom">
            <div
              onClick={() => {
                setIsSwitchActive(!isSwitchActive);
              }}
              className={
                !isSwitchActive
                  ? 'control-panel__switch'
                  : 'control-panel__switch_active'
              }
            >
              <div
                className={
                  !isSwitchActive
                    ? 'control-panel__switch-circle'
                    : 'control-panel__switch-circle_active'
                }
              ></div>
            </div>
            <p className="control-panel__switch-title">Короткометражки</p>
          </div>
        </section>
        <section className="movies-list">
          {filteredMovies
            .filter((movie) => {
              return (
                likedMovies.includes(movie.id) || location.pathname == '/movies'
              );
            })
            .filter((movie) => {
              return (movie.nameEN + movie.nameRU).includes(searchPrase);
            })
            .filter((movie) => {
              return movie.duration >= 40 || isSwitchActive;
            })
            .slice(0, CardsEdge)
            .map((item, index) => {
              return (
                <MovieCard
                  likedMovies={likedMovies}
                  setLikedMovies={setLikedMovies}
                  isLikedOnLoad={likedMovies?.includes(item.id)}
                  key={`${item.id}_${index}`}
                  card={item}
                />
              );
            })}
        </section>
        {location.pathname != '/saved-movies' &&
          CardsEdge < filteredMovies.length && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setCardsEdge(CardsEdge + howMuchCardsAdd);
              }}
              className="more-button"
            >
              Ещё
            </button>
          )}
      </main>
    </>
  );
}

export default MoviesList;
