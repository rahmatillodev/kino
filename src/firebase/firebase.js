import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import  {db } from "./config";

export const getFilmsCollection = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "films"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting films collection: ", error);
    throw error;
  }
};

export const getFilmById = async (id) => {
  try {
    const docRef = doc(db, "films", id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error("Film not found");
    }
    
    return { id: docSnap.id, ...docSnap.data() };
  } catch (error) {
    console.error(`Error getting film with ID ${id}: `, error);
    throw error;
  }
}

export const getSeriesCollection = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "series"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting series collection: ", error);
    throw error;
  }
};

export const getSeriesById = async (id) => {
    try {
      const docRef = doc(db, "series", id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        throw new Error("Series not found");
      }
      
      return { id: docSnap.id, ...docSnap.data() };
    } catch (error) {
      console.error(`Error getting series with ID ${id}: `, error);
      throw error;
    }
  };

export const getAnimeCollection = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "anime"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting anime collection: ", error);
    throw error;
  }
};

export const getAnimeById = async (id) => {
  try {
    const docRef = doc(db, "anime", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error("Anime not found");
    }
    
    return { id: docSnap.id, ...docSnap.data() };
  } catch (error) {
    console.error(`Error getting anime with ID ${id}: `, error);
    throw error;
  }
};

export const getCartoonCollection = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "cartoon"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting cartoon collection: ", error);
    throw error;
  }
};

export const getCartoonById = async (id) => {
  try {
    const docRef = doc(db, "cartoon", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error("Cartoon not found");
    }
    
    return { id: docSnap.id, ...docSnap.data() };
  } catch (error) {
    console.error(`Error getting cartoon with ID ${id}: `, error);
    throw error;
  }
};

// Watchlist collection functions
export const getWatchlistFilmsCollection = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "watchlist_film"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting watchlist films collection: ", error);
    throw error;
  }
};

export const getWatchlistSeriesCollection = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "watchlist_series"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting watchlist series collection: ", error);
    throw error;
  }
};

export const getWatchlistAnimeCollection = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "watchlist_anime"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting watchlist anime collection: ", error);
    throw error;
  }
};

export const getWatchlistCartoonCollection = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "watchlist_cartoon"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting watchlist cartoon collection: ", error);
    throw error;
  }
};

