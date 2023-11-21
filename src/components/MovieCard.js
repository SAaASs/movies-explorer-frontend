import React from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../utils/MainApi';
function MovieCard({ likedMovies, setLikedMovies, card, isLikedOnLoad }) {
  const location = useLocation();
  const [isLiked, setIsLiked] = React.useState(likedMovies.includes(card.id));
  let mins = card.duration % 60;
  if (mins < 10) {
    mins = '0' + (card.duration % 60);
  }
  React.useEffect(() => {
    if (location.pathname == '/saved-movies') {
      setIsLiked(true);
    }
  });
  return (
    (likedMovies.includes(card.id) || location.pathname == '/movies') && (
      <div className="movieCard">
        <img
          alt={'movies explorer movie '}
          className="movieCard__img"
          src={'https://api.nomoreparties.co' + card.image.url}
        ></img>
        <div className="movieCard__middle">
          <h2 className="movieCard__name">{card.nameRU}</h2>
          <button
            onClick={() => {
              if (!isLiked) {
                api
                  .LikeMovie(card)
                  .then(() => {
                    setIsLiked(!isLiked);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
                api
                  .UnlikeMovie(card.id)
                  .then((movie) => {
                    const res = likedMovies.filter((mov) => {
                      return !(mov == card.id);
                    });

                    setLikedMovies(res);
                  })
                  .then(() => {
                    setIsLiked(!isLiked);
                  });
              }
            }}
            className={!isLiked ? 'movieCard__like' : 'movieCard__like_active'}
          ></button>
        </div>
        <h4 className="movieCard__duration">{`${Math.floor(
          card.duration / 60
        )}ч ${mins}м`}</h4>
      </div>
    )
  );
}

export default MovieCard;
