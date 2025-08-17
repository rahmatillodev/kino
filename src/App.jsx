import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Navbar from './components/navbar';
import useMediaStore from './services/get_data';

function App() {

  const { fetchAllCollections, fetchAllWatchlists } = useMediaStore();
  
  useEffect(() => {
    // Fetch all collections on app start
    fetchAllCollections();
    fetchAllWatchlists();
  }, [fetchAllCollections, fetchAllWatchlists]);

  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/film" element={<Film />} /> */}
        {/* <Route path="/series" element={<Series />} /> */}

      </Routes>
    </BrowserRouter>
  )
}

export default App;