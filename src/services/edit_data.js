// services/edit_data.js
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const editFilm = async (id, updatedData) => {
  const docRef = doc(db, 'films', id);
  
  try {
    await updateDoc(docRef, updatedData);
    return { success: true };
  } catch (error) {
    console.error("Error editing document: ", error);
    return { success: false, error };
  }
};

export const editSeries = async (id, updatedData) => {
  const docRef = doc(db, 'series', id);
  
  try {
    await updateDoc(docRef, updatedData);
    return { success: true };
  } catch (error) {
    console.error("Error editing document: ", error);
    return { success: false, error };
  }
};

export const editAnime = async (id, updatedData) => {
  const docRef = doc(db, 'anime', id);
  
  try {
    await updateDoc(docRef, updatedData);
    return { success: true };
  } catch (error) {
    console.error("Error editing document: ", error);
    return { success: false, error };
  }
};

export const editCartoon = async (id, updatedData) => {
  const docRef = doc(db, 'cartoon', id);
  
  try {
    await updateDoc(docRef, updatedData);
    return { success: true };
  } catch (error) {
    console.error("Error editing document: ", error);
    return { success: false, error };
  }
};

// Watchlist edit functions
export const editWatchlistFilm = async (id, updatedData) => {
  const docRef = doc(db, 'watchlist_film', id);
  
  try {
    await updateDoc(docRef, updatedData);
    return { success: true };
  } catch (error) {
    console.error("Error editing watchlist film: ", error);
    return { success: false, error };
  }
};

export const editWatchlistSeries = async (id, updatedData) => {
  const docRef = doc(db, 'watchlist_series', id);
  
  try {
    await updateDoc(docRef, updatedData);
    return { success: true };
  } catch (error) {
    console.error("Error editing watchlist series: ", error);
    return { success: false, error };
  }
};

export const editWatchlistAnime = async (id, updatedData) => {
  const docRef = doc(db, 'watchlist_anime', id);
  
  try {
    await updateDoc(docRef, updatedData);
    return { success: true };
  } catch (error) {
    console.error("Error editing watchlist anime: ", error);
    return { success: false, error };
  }
};

export const editWatchlistCartoon = async (id, updatedData) => {
  const docRef = doc(db, 'watchlist_cartoon', id);
  
  try {
    await updateDoc(docRef, updatedData);
    return { success: true };
  } catch (error) {
    console.error("Error editing watchlist cartoon: ", error);
    return { success: false, error };
  }
};

// Generic edit function that handles all types
export const editItem = async (id, updatedData, type, isWatchlist = false) => {
  try {
    let editFunction;
    if (isWatchlist) {
      switch (type) {
        case 'films':
          return await editWatchlistFilm(id, updatedData);
        case 'series':
          return await editWatchlistSeries(id, updatedData);
        case 'anime':
          return await editWatchlistAnime(id, updatedData);
        case 'cartoon':
          return await editWatchlistCartoon(id, updatedData);
        default:
          throw new Error('Invalid type');
      }
    } else {
      switch (type) {
        case 'films':
          return await editFilm(id, updatedData);
        case 'series':
          return await editSeries(id, updatedData);
        case 'anime':
          return await editAnime(id, updatedData);
        case 'cartoon':
          return await editCartoon(id, updatedData);
        default:
          throw new Error('Invalid type');
      }
    }
  } catch (error) {
    console.error("Error editing item: ", error);
    return { success: false, error };
  }
};