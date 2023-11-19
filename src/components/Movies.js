import Header from './Header';
import Footer from './Footer';
import MoviesList from './MoviesList';
import { useLocation } from 'react-router-dom';
function Movies() {
  const location = useLocation();
  return (
    <>
      <Header location={location.pathname}></Header>
      <MoviesList></MoviesList>
      <Footer></Footer>
    </>
  );
}

export default Movies;
