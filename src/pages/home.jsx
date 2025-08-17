import React, { useState } from 'react';
import { FiRefreshCw, FiPlus, FiEye, FiEyeOff } from 'react-icons/fi';
import useMediaStore from '../services/get_data';
import Loading from '../components/loading';
import { AddFilmModal } from '../components/modal/add_film_modal';
import { DeleteModal } from '../components/modal/delete_modal'; 
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { deleteItem } from '../services/delete_data';
import { addFilm, addSeries, addAnime, addCartoon, moveFromWatchlistToMain, moveFromMainToWatchlist } from '../services/add_data';
import { editItem } from '../services/edit_data';
import { Link } from 'react-router-dom';

function Home() {
  const { 
    currentView, 
    isWatchlist, 
    loading, 
    error, 
    setCurrentView, 
    toggleWatchlist, 
    fetchCurrentCollection,
    getCurrentCollectionData,
    refreshFilms,
    refreshSeries,
    refreshAnime,
    refreshCartoon
  } = useMediaStore();

  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    year: '',
    description: '',
    image: '',
    imdbLink: '',
    nameUz: '',
    studio: '',
    country: '',
    duration: ''
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Get current collection data
  const currentData = getCurrentCollectionData();

  // Handle collection type change
  const handleCollectionChange = (collectionType) => {
    setCurrentView(collectionType);
  };

  // Handle watchlist toggle
  const handleWatchlistToggle = () => {
    toggleWatchlist();
  };

  // Handle adding new item
  const handleAddItem = (data) => {
    console.log('Adding new item:', data);
    
    let addFunction;
    switch (currentView) {
      case 'films':
        addFunction = isWatchlist ? addFilm : addFilm;
        break;
      case 'series':
        addFunction = isWatchlist ? addSeries : addSeries;
        break;
      case 'anime':
        addFunction = isWatchlist ? addAnime : addAnime;
        break;
      case 'cartoon':
        addFunction = isWatchlist ? addCartoon : addCartoon;
        break;
      default:
        addFunction = addFilm;
    }
    
    addFunction(data);
    fetchCurrentCollection();
    setIsOpen(false);
    setNewItem({
      name: '',
      year: '',
      description: '',
      image: '',
      imdbLink: '',
      nameUz: '',
      studio: '',
      country: '',
      duration: ''
    });
  };

  // Handle moving item between watchlist and main collection
  const handleMoveItem = async (item) => {
    try {
      if (isWatchlist) {
        // Move from watchlist to main
        const result = await moveFromWatchlistToMain(item, currentView);
        if (result.success) {
          console.log(result.message);
          fetchCurrentCollection();
        }
      } else {
        // Move from main to watchlist
        const result = await moveFromMainToWatchlist(item, currentView);
        if (result.success) {
          console.log(result.message);
          fetchCurrentCollection();
        }
      }
    } catch (error) {
      console.error('Error moving item:', error);
    }
  };

  // Handle delete item
  const handleDeleteItem = async () => {
    if (itemToDelete) {
      const result = await deleteItem(itemToDelete.id, currentView, isWatchlist);
      if (result.success) {
        fetchCurrentCollection();
        setIsDeleteModalOpen(false); 
        setItemToDelete(null); 
      }
    }
  };

  const handleOpenDeleteModal = (item) => {
    setItemToDelete(item); 
    setIsDeleteModalOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false); 
    setItemToDelete(null); 
  };

  const handleEditItem = async (item) => {
    setIsEdit(true);
    setNewItem(item);
    const result = await editItem(item.id, item, currentView, isWatchlist);
    if (result.success) {
      fetchCurrentCollection();
    }
    setIsOpen(true);
  };

  // Get refresh function based on current view
  const getRefreshFunction = () => {
    switch (currentView) {
      case 'films': return refreshFilms;
      case 'series': return refreshSeries;
      case 'anime': return refreshAnime;
      case 'cartoon': return refreshCartoon;
      default: return refreshFilms;
    }
  };

  if (loading) return <Loading />;

  return (
    <div className='p-8 max-w-8xl mx-auto'>
      {error && <div className='text-red-500 mb-4'>{error}</div>}

      {/* Collection Type Selector */}
      <div className='flex justify-center mb-6'>
        <div className='flex space-x-2 bg-gray-100 p-2 rounded-lg'>
          {['films', 'series', 'anime', 'cartoon'].map((type) => (
            <Button
              key={type}
              variant={currentView === type ? 'default' : 'outline'}
              onClick={() => handleCollectionChange(type)}
              className='capitalize'
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      {/* Watchlist Toggle */}
      <div className='flex justify-center mb-6'>
        <Button
          variant={isWatchlist ? 'default' : 'outline'}
          onClick={handleWatchlistToggle}
          className='flex items-center gap-2'
        >
          {isWatchlist ? <FiEyeOff /> : <FiEye />}
          {isWatchlist ? 'Watchlist' : 'Main Collection'}
        </Button>
      </div>

      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold capitalize'>
          {isWatchlist ? 'Watchlist ' : ''}{currentView}
        </h1>
        <div className='flex gap-4'>
          <Button className='bg-blue-500 text-white' onClick={getRefreshFunction()}>
            Refresh
          </Button>
          <Button className='bg-green-500 text-white' onClick={() => setIsOpen(true)}>
            Add {currentView.slice(0, -1)}
          </Button>
        </div>
      </div>

      <div className='overflow-x-auto'>
        <Table>
          <TableHeader className='bg-gray-100 border border-black'>
            <TableRow>
              <TableHead className='border border-black text-center'>Poster</TableHead>
              <TableHead className='border border-black text-center'>Name</TableHead>
              <TableHead className='border border-black text-center'>IMDb</TableHead>
              <TableHead className='border border-black text-center'>Name (Uzbek)</TableHead>
              <TableHead className='border border-black text-center'>Year</TableHead>
              <TableHead className='border border-black text-center'>Studio</TableHead>
              <TableHead className='border border-black text-center'>Country</TableHead>
              <TableHead className='border border-black text-center'>Duration</TableHead>
              <TableHead className='border border-black text-center'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  )}
                </TableCell>
                <TableCell>
                  <div>{item.name}</div>
                </TableCell>
                <TableCell>
                  {item.imdbLink && (
                    <a href={item.imdbLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm">
                      IMDb
                    </a>
                  )}
                </TableCell>
                <TableCell>{item.nameUz}</TableCell>
                <TableCell>{item.year}</TableCell>
                <TableCell>{item.studio}</TableCell>
                <TableCell>
                  <Badge colorScheme="purple">{item.country}</Badge>
                </TableCell>
                <TableCell>{item.duration}</TableCell>
                <TableCell>
                  <div className='flex gap-2 justify-around'>
                    <Button className='bg-blue-500 text-white' onClick={() => handleEditItem(item)}>
                      Edit
                    </Button>
                    <Button className='bg-red-500 text-white mx-2' onClick={() => handleOpenDeleteModal(item)}>
                      Delete
                    </Button>
                    <Button 
                      className='bg-yellow-500 text-white'
                      onClick={() => handleMoveItem(item)}
                    >
                      {isWatchlist ? 'Move to Main' : 'Move to Watchlist'}
                    </Button>
                    <Button className='bg-green-500 text-white'>
                      <Link to={`/${currentView.slice(0, -1)}/${item.id}`}>
                        Open
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add Item Modal */}
      <AddFilmModal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        onSubmit={handleAddItem}
        isEdit={isEdit}
        filmData={newItem}
      />

      {/* Delete Item Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onDelete={handleDeleteItem}
        filmName={itemToDelete ? itemToDelete.name : ''} 
      />
    </div>
  );
}

export default Home;
