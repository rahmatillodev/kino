import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import useMediaStore from './services/get_data';
import HomeFilms from './pages/home_films';
import HomeAnime from './pages/home_anime';
import HomeSeries from './pages/home_series';
import HomeCartoon from './pages/home_cartoon';
import HomeWatchlistFilms from './pages/home_watchlist_films';
import HomeWatchlistSeries from './pages/home_watchlist_series';
import HomeWatchlistAnime from './pages/home_watchlist_anime';
import HomeWatchlistCartoon from './pages/home_watchlist_cartoon';
import FilmsDetailPage from './pages/films_detail_page';

function App() {

  const { fetchAllCollections, fetchAllWatchlists } = useMediaStore();
  
  useEffect(() => {
    fetchAllCollections();
    fetchAllWatchlists();
  }, [fetchAllCollections, fetchAllWatchlists]);

  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<HomeFilms />} />
        <Route path="/home_series" element={<HomeSeries />} />
        <Route path="/home_anime" element={<HomeAnime />} />
        <Route path="/home_cartoon" element={<HomeCartoon />} />
        <Route path="/film/:id" element={<FilmsDetailPage />} />
        <Route path="/home_watchlist_films" element={<HomeWatchlistFilms />} />
        <Route path="/home_watchlist_series" element={<HomeWatchlistSeries/>} />
        <Route path="/home_watchlist_anime" element={<HomeWatchlistAnime />} />
        <Route path="/home_watchlist_cartoon" element={<HomeWatchlistCartoon />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;