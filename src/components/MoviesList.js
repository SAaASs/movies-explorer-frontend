import React from 'react';
import MovieCard from './MovieCard';
import ControlPanel from './ControlPanel';
import { useLocation } from 'react-router-dom';
let cards = [
  {
    _id: '596534876537843',
    image:
      'https://images.unsplash.com/photo-1695805868055-636315fcd124?auto=format&fit=crop&q=80&w=3864&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    nameRU: 'Фильм',
    duration: 22000,
  },
  {
    _id: '90374296585435t3',
    image:
      'https://images.unsplash.com/photo-1695805868055-636315fcd124?auto=format&fit=crop&q=80&w=3864&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    nameRU: 'Фильм',
    duration: 22000,
  },
  {
    _id: '354309827598057',
    image:
      'https://images.unsplash.com/photo-1695805868055-636315fcd124?auto=format&fit=crop&q=80&w=3864&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    nameRU: 'Фильм',
    duration: 22000,
  },
  {
    _id: '607589243534274',
    image:
      'https://images.unsplash.com/photo-1695805868055-636315fcd124?auto=format&fit=crop&q=80&w=3864&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    nameRU: 'Фильм',
    duration: 22000,
  },
  {
    _id: '5724509847598043',
    image:
      'https://images.unsplash.com/photo-1695805868055-636315fcd124?auto=format&fit=crop&q=80&w=3864&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    nameRU: 'Фильм',
    duration: 22000,
  },
  {
    _id: '347209479204842',
    image:
      'https://images.unsplash.com/photo-1695805868055-636315fcd124?auto=format&fit=crop&q=80&w=3864&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    nameRU: 'Фильм',
    duration: 22000,
  },
];
function MoviesList() {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <>
      <ControlPanel></ControlPanel>
      <section className="moviesList">
        {cards.map((item) => {
          return <MovieCard key={item._id} card={item}></MovieCard>;
        })}
      </section>
      <div className="movie-list__more-button">Ещё</div>
    </>
  );
}

export default MoviesList;
