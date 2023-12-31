import Header from './Header';
import Title from './Title';
import About from './About';
import Tech from './Tech';
import Portfolio from './Portfolio';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
import React from 'react';
function Home() {
  const location = useLocation();
  console.log('home returned?');
  return (
    <>
      <Header location={location.pathname}></Header>
      <main className="main">
        <Title></Title>
        <About></About>
        <Tech></Tech>
        <Portfolio></Portfolio>
      </main>
      <Footer></Footer>
    </>
  );
}

export default Home;
