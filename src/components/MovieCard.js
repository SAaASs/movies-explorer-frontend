import React from 'react';
function MovieCard({ card }) {
  const [isLiked, setIsLiked] = React.useState(false);
  return (
    <>
      <div className="movieCard">
        <img
          alt={'movies explorer movie '}
          className="movieCard__img"
          src={card.image}
        ></img>
        <div className="movieCard__middle">
          <h2 className="movieCard__name">{card.nameRU}</h2>
          <button
            onClick={() => {
              setIsLiked(!isLiked);
            }}
            className={!isLiked ? 'movieCard__like' : 'movieCard__like_active'}
          ></button>
        </div>
        <h4 className="movieCard__duration">{`${Math.floor(
          card.duration / 3600
        )}:${card.duration % 60}`}</h4>
      </div>
    </>
  );
}

export default MovieCard;
