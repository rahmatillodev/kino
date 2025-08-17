// services/add_data.js
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";

export const addFilm = async (data) => {
  const collectionRef = collection(db, 'films');

  try {
    await addDoc(collectionRef, data);
    return { success: true };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false, error };
  }
};

export const addSeries = async (data) => {
  const collectionRef = collection(db, 'series');
  
  try {
    await addDoc(collectionRef, data);
    return { success: true };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false, error };
  }
};

export const addCartoon = async (data) => {
  const collectionRef = collection(db, 'cartoon');
  
  try {
    await addDoc(collectionRef, data);
    return { success: true };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false, error };
  }
};

export const addAnime = async (data) => {
  const collectionRef = collection(db, 'anime');
  
  try {
    await addDoc(collectionRef, data);
    return { success: true };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false, error };
  }
};

export const addWatchlistFilm = async (data) => {
  const collectionRef = collection(db, 'watchlist_film');

  try {
    await addDoc(collectionRef, data);
    return { success: true };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false, error };
  }
};

export const addWatchlistSeries = async (data) => {
  const collectionRef = collection(db, 'watchlist_series');
  
  try {
    await addDoc(collectionRef, data);
    return { success: true };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false, error };
  }
};

export const addWatchlistCartoon = async (data) => {
  const collectionRef = collection(db, 'watchlist_cartoon');
  
  try {
    await addDoc(collectionRef, data);
    return { success: true };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false, error };
  }
};

export const addWatchlistAnime = async (data) => {
  const collectionRef = collection(db, 'watchlist_anime');
  
  try {
    await addDoc(collectionRef, data);
    return { success: true };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false, error };
  }
};

// Function to move item from watchlist to main collection
export const moveFromWatchlistToMain = async (item, type) => {
  try {
    // Add to main collection
    let addResult;
    switch (type) {
      case 'film':
        addResult = await addFilm(item);
        break;
      case 'series':
        addResult = await addSeries(item);
        break;
      case 'anime':
        addResult = await addAnime(item);
        break;
      case 'cartoon':
        addResult = await addCartoon(item);
        break;
      default:
        throw new Error('Invalid type');
    }
    
    if (addResult.success) {
      return { success: true, message: `Moved ${type} from watchlist to main collection` };
    } else {
      throw new Error('Failed to add to main collection');
    }
  } catch (error) {
    console.error("Error moving from watchlist to main: ", error);
    return { success: false, error };
  }
};

// Function to move item from main collection to watchlist
export const moveFromMainToWatchlist = async (item, type) => {
  try {
    // Add to watchlist collection
    let addResult;
    switch (type) {
      case 'film':
        addResult = await addWatchlistFilm(item);
        break;
      case 'series':
        addResult = await addWatchlistSeries(item);
        break;
      case 'anime':
        addResult = await addWatchlistAnime(item);
        break;
      case 'cartoon':
        addResult = await addWatchlistCartoon(item);
        break;
      default:
        throw new Error('Invalid type');
    }
    
    if (addResult.success) {
      return { success: true, message: `Moved ${type} to watchlist` };
    } else {
      throw new Error('Failed to add to watchlist');
    }
  } catch (error) {
    console.error("Error moving to watchlist: ", error);
    return { success: false, error };
  }
};