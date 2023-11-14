import React from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../utils/MainApi';
function MovieCard({ likedMoovies, onLikeMovieClick, card, isLikedOnLoad }) {
  const [isLiked, setIsLiked] = React.useState(isLikedOnLoad);
  const location = useLocation();
  let mins = card.duration % 60;
  if (mins < 10) {
    mins = '0' + (card.duration % 60);
  }
  return likedMoovies.includes(card.id) || location.pathname == '/movies' ? (
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
              api.LikeMovie(card);
              onLikeMovieClick([...likedMoovies, card.id]);
            } else {
              api.UnlikeMovie(card.id).then((movie) => {
                const res = likedMoovies.filter((mov) => {
                  console.log(!(mov == card.id));
                  return !(mov == card.id);
                });

                onLikeMovieClick(res);
              });
            }
            setIsLiked(!isLiked);
          }}
          className={!isLiked ? 'movieCard__like' : 'movieCard__like_active'}
        ></button>
      </div>
      <h4 className="movieCard__duration">{`${Math.floor(
        card.duration / 60
      )}:${mins}`}</h4>
    </div>
  ) : (
    ''
  );
}

export default MovieCard;
