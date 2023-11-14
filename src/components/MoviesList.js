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
  const allMoovies = useRef(null);
  const [filteredMoovies, setFilteredMoovies] = React.useState([]);
  const [likedMoovies, setLikedMoovies] = React.useState([]);

  React.useEffect(() => {
    Promise.all([movApi.getAllMovies(), api.getMyMovies()]).then(
      ([all, likes]) => {
        allMoovies.current = all;
        isSwitchActive
          ? setFilteredMoovies([...all])
          : setFilteredMoovies(
              [...all].filter((movie) => {
                return movie.duration >= 40;
              })
            );
        // console.log('readytorender');
        // let likedIds = likes.map((item) => item.movieId);
        // setLikedMoovies(likedIds);
        // if (location.pathname == '/saved-movies') {
        //   setFilteredMoovies(
        //     allMoovies.current.filter((movie) => {
        //       return likedIds.includes(movie.id);
        //     })
        //   );
        // }
      }
    );
  }, [location, isSwitchActive]);
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
  return (
    <>
      <main className="main">
        <section className="control-panel">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setFilteredMoovies(
                allMoovies.current.filter((movie) => {
                  return (movie.nameRU + movie.nameEN)
                    .toLowerCase()
                    .includes(e.target[0].value.trim().toLowerCase());
                })
              );
            }}
            className="control-panel__upper"
          >
            <input
              placeholder="Фильмы"
              className="control-panel__title"
              onChange={(e) => {
                setFilteredMoovies(
                  allMoovies.current.filter((movie) => {
                    return (movie.nameRU + movie.nameEN)
                      .toLowerCase()
                      .includes(e.target.value.trim().toLowerCase());
                  })
                );
              }}
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
          {location.pathname != 'saved-movies'
            ? filteredMoovies.slice(0, CardsEdge).map((item, index) => {
                return (
                  <MovieCard
                    likedMoovies={likedMoovies}
                    setLikedMoovies={setLikedMoovies}
                    isLikedOnLoad={likedMoovies.includes(item.id)}
                    key={`${item.id}_${index}`}
                    card={item}
                  />
                );
              })
            : filteredMoovies
                .filter((movie) => {
                  return likedMoovies.includes(movie.id);
                })
                .map((item, index) => {
                  return (
                    <MovieCard
                      likedMoovies={likedMoovies}
                      setLikedMoovies={setLikedMoovies}
                      isLikedOnLoad={likedMoovies.includes(item.id)}
                      key={`${item.id}_${index}`}
                      card={item}
                    />
                  );
                })}
        </section>
        {location.pathname != '/saved-movies' &&
          CardsEdge < filteredMoovies.length && (
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
