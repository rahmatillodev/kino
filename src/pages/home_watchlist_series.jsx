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
import { addSeries, moveFromWatchlistToMain, moveFromMainToWatchlist } from '../services/add_data';
import { editItem } from '../services/edit_data';
import { Link } from 'react-router-dom';

function HomeWatchlistSeries() {
  const { 
    isWatchlist, 
    loading, 
    error, 
    toggleWatchlist, 
    fetchCurrentCollection,
    getCurrentCollectionData,
    refreshSeries,
    setCurrentView,
  } = useMediaStore();

  React.useEffect(() => {
    setCurrentView('series');
  }, [setCurrentView]);

  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({
    name: '',
    year: '',
    description: '',
    image: '',
    imdbLink: '',
    nameUz: '',
    country: '',
    duration: '',
    episodes: ''
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const currentData = getCurrentCollectionData();

  const handleWatchlistToggle = () => {
    toggleWatchlist();
  };

  const handleAddItem = (data) => {
    console.log('Adding new item:', data);
    
    if (isEdit && editingItem) {
      editItem(editingItem.id, data, 'series', isWatchlist)
        .then(result => {
          if (result.success) {
            fetchCurrentCollection();
            setIsOpen(false);
            setIsEdit(false);
            setEditingItem(null);
            setNewItem({
              name: '',
              year: '',
              description: '',
              image: '',
              imdbLink: '',
              nameUz: '',
              country: '',
              duration: '',
              episodes: ''
            });
          }
        });
    } else {
      addSeries(data, isWatchlist);
      fetchCurrentCollection();
      setIsOpen(false);
      setNewItem({
        name: '',
        year: '',
        description: '',
        image: '',
        imdbLink: '',
        nameUz: '',
        country: '',
        duration: '',
        episodes: ''
      });
    }
  };

  const handleMoveItem = async (item) => {
    try {
      if (isWatchlist) {
        const result = await moveFromWatchlistToMain(item, 'series');
        if (result.success) {
          console.log(result.message);
          fetchCurrentCollection();
        }
      } else {
        const result = await moveFromMainToWatchlist(item, 'series');
        if (result.success) {
          console.log(result.message);
          fetchCurrentCollection();
        }
      }
    } catch (error) {
      console.error('Error moving item:', error);
    }
  };

  const handleDeleteItem = async () => {
    if (itemToDelete) {
      const result = await deleteItem(itemToDelete.id, 'series', isWatchlist);
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

  const handleEditItem = (item) => {
    setIsEdit(true);
    setEditingItem(item);
    setNewItem(item);
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
    setIsEdit(false);
    setEditingItem(null);
    setNewItem({
      name: '',
      year: '',
      description: '',
      image: '',
      imdbLink: '',
      nameUz: '',
      country: '',
      duration: '',
      episodes: ''
    });
  };

  if (loading) return <Loading />;

  return (
    <div className='p-8 max-w-8xl mx-auto'>
      {error && <div className='text-red-500 mb-4'>{error}</div>}

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
        <h1 className='text-2xl font-bold'>
          {isWatchlist ? 'Watchlist Series' : 'Series'}
        </h1>
        <div className='flex gap-4'>
          <Button className='bg-blue-500 text-white' onClick={refreshSeries}>
            Refresh
          </Button>
          <Button className='bg-green-500 text-white' onClick={() => setIsOpen(true)}>
            Add Series
          </Button>
        </div>
      </div>

      <div className='overflow-x-auto'>
        <Table>
          <TableHeader className='bg-gray-100 border border-black'>
            <TableRow>
              <TableHead className='border border-black text-center'>ID</TableHead>
              <TableHead className='border border-black text-center'>Poster</TableHead>
              <TableHead className='border border-black text-center'>Name</TableHead>
              <TableHead className='border border-black text-center'>Name (Uzbek)</TableHead>
              <TableHead className='border border-black text-center'>IMDb</TableHead>
              <TableHead className='border border-black text-center'>Year</TableHead>
              <TableHead className='border border-black text-center'>Country</TableHead>
              <TableHead className='border border-black text-center'>Duration</TableHead>
              <TableHead className='border border-black text-center'>Episodes</TableHead>
              <TableHead className='border border-black text-center'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
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
                <TableCell>{item.nameUz}</TableCell>
                <TableCell>
                  {item.imdbLink && (
                    <a href={item.imdbLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm">
                      IMDb
                    </a>
                  )}
                </TableCell>
                <TableCell>{item.year}</TableCell>
                <TableCell>
                  <Badge colorScheme="purple">{item.country}</Badge>
                </TableCell>
                <TableCell>{item.duration}</TableCell>
                <TableCell>{item.episodes || '-'}</TableCell>
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
                      <Link to={`/series/${item.id}`}>
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

      {/* Add/Edit Item Modal */}
      <AddFilmModal
        isOpen={isOpen}
        onOpenChange={handleModalClose}
        onSubmit={handleAddItem}
        isEdit={isEdit}
        filmData={newItem}
        contentType="series"
      />

      {/* Delete Item Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onOpenChange={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteItem}
        filmName={itemToDelete ? itemToDelete.name : ''} 
      />
    </div>
  );
}

export default HomeWatchlistSeries;