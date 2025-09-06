// services/delete_data.js
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const deleteFilm = async (id) => {
  const docRef = doc(db, "films", id);

  try {
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.error("Error deleting document: ", error);
    return { success: false, error };
  }
};

export const deleteSeries = async (id) => {
  const docRef = doc(db, "series", id);

  try {
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.error("Error deleting document: ", error);
    return { success: false, error };
  }
};

export const deleteAnime = async (id) => {
  const docRef = doc(db, "anime", id);

  try {
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.error("Error deleting document: ", error);
    return { success: false, error };
  }
};

export const deleteCartoon = async (id) => {
  const docRef = doc(db, "cartoon", id);

  try {
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.error("Error deleting document: ", error);
    return { success: false, error };
  }
};

// Watchlist delete functions
export const deleteWatchlistFilm = async (id) => {
  const docRef = doc(db, "watchlist_film", id);

  try {
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.error("Error deleting watchlist film: ", error);
    return { success: false, error };
  }
};

export const deleteWatchlistSeries = async (id) => {
  const docRef = doc(db, "watchlist_series", id);

  try {
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.error("Error deleting watchlist series: ", error);
    return { success: false, error };
  }
};

export const deleteWatchlistAnime = async (id) => {
  const docRef = doc(db, "watchlist_anime", id);

  try {
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.error("Error deleting watchlist anime: ", error);
    return { success: false, error };
  }
};

export const deleteWatchlistCartoon = async (id) => {
  const docRef = doc(db, "watchlist_cartoon", id);

  try {
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.error("Error deleting watchlist cartoon: ", error);
    return { success: false, error };
  }
};

// Generic delete function that handles all types
export const deleteItem = async (id, type, isWatchlist = false) => {
  console.log(id, type, isWatchlist);

  try {
    let deleteFunction;
    if (isWatchlist) {

      switch (type) {
        case "films":
          return await deleteWatchlistFilm(id);
        case "series":
          return await deleteWatchlistSeries(id);
        case "anime":
          return await deleteWatchlistAnime(id);
        case "cartoon":
          return await deleteWatchlistCartoon(id);
        default:
          throw new Error("Invalid type");
      }
    } else {
      switch (type) {
        case "films":
          return await deleteFilm(id);
        case "series":
          return await deleteSeries(id);
        case "anime":
          return await deleteAnime(id);
        case "cartoon":
          return await deleteCartoon(id);
        default:
          throw new Error("Invalid type");
      }
    }
  } catch (error) {
    console.error("Error deleting item: ", error);
    return { success: false, error };
  }
};
