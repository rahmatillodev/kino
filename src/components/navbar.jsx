import React from 'react'
import { Link } from 'react-router-dom'
import useMediaStore from '../services/get_data';

function Navbar() {
  const { currentView, isWatchlist, setCurrentView, toggleWatchlist } = useMediaStore();

  const handleNavClick = (view) => {
    setCurrentView(view);
  };

  return (
    <div>
        <div className='flex justify-between items-center p-4 bg-gray-800 text-white'>
            <div className='flex space-x-6'>
                <h1 className={`cursor-pointer ${currentView === 'films' && !isWatchlist ? 'text-blue-400' : ''}`}>
                    <Link to="/" onClick={() => handleNavClick('films')}>Films</Link>
                </h1>
                <h1 className={`cursor-pointer ${currentView === 'series' && !isWatchlist ? 'text-blue-400' : ''}`}>
                    <Link to="/home_series" onClick={() => handleNavClick('series')}>Series</Link>
                </h1>
                <h1 className={`cursor-pointer ${currentView === 'anime' && !isWatchlist ? 'text-blue-400' : ''}`}>
                    <Link to="/home_anime" onClick={() => handleNavClick('anime')}>Anime</Link>
                </h1>
                <h1 className={`cursor-pointer ${currentView === 'cartoon' && !isWatchlist ? 'text-blue-400' : ''}`}>
                    <Link to="/home_cartoon" onClick={() => handleNavClick('cartoon')}>Cartoons</Link>
                </h1>
            </div>
            
            <div className='flex space-x-6'>
                <h1 className={`cursor-pointer ${currentView === 'films' && isWatchlist ? 'text-blue-400' : ''}`}>
                    <Link to="/home_watchlist_films" onClick={() => { handleNavClick('films'); if (!isWatchlist) toggleWatchlist(); }}>Watch Films</Link>
                </h1>
                <h1 className={`cursor-pointer ${currentView === 'series' && isWatchlist ? 'text-blue-400' : ''}`}>
                    <Link to="/home_watchlist_series" onClick={() => { handleNavClick('series'); if (!isWatchlist) toggleWatchlist(); }}>Watch Series</Link>
                </h1>
                <h1 className={`cursor-pointer ${currentView === 'anime' && isWatchlist ? 'text-blue-400' : ''}`}>
                    <Link to="/home_watchlist_anime" onClick={() => { handleNavClick('anime'); if (!isWatchlist) toggleWatchlist(); }}>Watch Anime</Link>
                </h1>
                <h1 className={`cursor-pointer ${currentView === 'cartoon' && isWatchlist ? 'text-blue-400' : ''}`}>
                    <Link to="/home_watchlist_cartoon" onClick={() => { handleNavClick('cartoon'); if (!isWatchlist) toggleWatchlist(); }}>Watch Cartoons</Link>
                </h1>
            </div>
        </div>
    </div>
  )
}

export default Navbar