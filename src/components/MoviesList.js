import React, { useRef } from 'react';
import MovieCard from './MovieCard';
import { useLocation } from 'react-router-dom';
import { movApi } from '../utils/MoviesApi';
import { api } from '../utils/MainApi';
import useWindowDimensions from '../utils/useWindowDimension';
import Loader from './Loader';
import FoundNothing from './FoundNothing';

function MoviesList() {
  const { height, width } = useWindowDimensions();
  const location = useLocation();
  console.log(
    'lastQuery lastSwitchState',
    localStorage.getItem('sasMovExpLastSearchQuery'),
    localStorage.getItem('sasMovExpLastSwitchState')
  );
  const [howMuchCardsAdd, setHowMuchCardsAdd] = React.useState(4);
  const [CardsEdge, setCardsEdge] = React.useState(
    location.pathname == '/movies' ? 16 : 100
  );
  const [isSwitchActive, setIsSwitchActive] = React.useState(
    location.pathname == '/movies'
      ? typeof localStorage.getItem('sasMovExpLastSwitchState') == 'string'
        ? localStorage.getItem('sasMovExpLastSwitchState') === 'true'
        : false
      : false
  );
  const allMovies = useRef(null);
  const filteredLingth = useRef(null);
  const inputRef = useRef(null);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [likedMovies, setLikedMovies] = React.useState([]);
  const [searchPrase, setSearchPhrase] = React.useState('');
  const [haveQueryOnLoad, setHaveQueryOnLoad] = React.useState(
    typeof localStorage.getItem('sasMovExpLastSearchQuery') == 'string'
      ? true
      : false
  );
  const [isPageLoaded, setIsPageLoaded] = React.useState(false);

  const filterFunc = () => {
    if (!allMovies.current) {
      return;
    }

    const newList = allMovies.current
      .filter((movie) => {
        return (movie.nameEN + movie.nameRU)
          .toLowerCase()
          .includes(searchPrase.toLowerCase());
      })
      .filter((movie) => {
        return movie.duration <= 40 || !isSwitchActive;
      });
    if (filteredLingth.current) {
      filteredLingth.current = { length: newList.length };
    }
    return newList;
  };

  const handleSearchChange = (e) => {
    console.log(allMovies.current);
    e.preventDefault();
    setSearchPhrase(e.target[0].value);
    localStorage.setItem('sasMovExpLastSearchQuery', e.target[0].value);
  };

  React.useEffect(() => {
    Promise.all([movApi.getAllMovies(), api.getMyMovies()])
      .then(([all, likes]) => {
        allMovies.current = all;
        setFilteredMovies(all);
        setLikedMovies(likes.map((item) => item.movieId));
        console.log();
        setIsPageLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    const val =
      location.pathname == '/movies'
        ? localStorage.getItem('sasMovExpLastSearchQuery') || ''
        : '';
    if (!inputRef.current) {
      return;
    }
    inputRef.current.value = val;
    setSearchPhrase(val);
    setFilteredMovies(filterFunc());
  }, [inputRef.current, location]);

  React.useEffect(() => {
    const newList = filterFunc();
    console.log('searchPhrase >>> ', searchPrase, newList);
    setFilteredMovies(newList);
  }, [location, searchPrase, isSwitchActive]);

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
    if (location.pathname == '/saved-movies') {
      setCardsEdge(100);
    }
  }, [searchPrase, isSwitchActive, location]);
  React.useEffect(() => {
    if (location.pathname == '/saved-movies') {
      api.getMyMovies().then((likes) => {
        setLikedMovies(likes.map((item) => item.movieId));
      });
      setIsSwitchActive(false);
    }
  }, [location]);
  return isPageLoaded ? (
    <>
      <main className="main">
        <section className="control-panel">
          <form onSubmit={handleSearchChange} className="control-panel__upper">
            <input
              ref={inputRef}
              placeholder="Фильмы"
              className="control-panel__title"
            ></input>
            <button type="submit" className="control-panel__search-button">
              Найти
            </button>
          </form>
          <div className="control-panel__bottom">
            <div
              onClick={() => {
                localStorage.setItem(
                  'sasMovExpLastSwitchState',
                  !isSwitchActive
                );
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
        {(haveQueryOnLoad ||
          searchPrase.length > 0 ||
          location.pathname == '/saved-movies') &&
        filteredMovies.length > 0 ? (
          <section className="movies-list">
            {filteredMovies.slice(0, CardsEdge).map((item, index) => {
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
        ) : (
          <FoundNothing></FoundNothing>
        )}
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
  ) : (
    <Loader></Loader>
  );
}

export default MoviesList;
