import { create } from 'zustand';
import { 
  getFilmsCollection, 
  getSeriesCollection, 
  getAnimeCollection, 
  getCartoonCollection,
  getWatchlistFilmsCollection,
  getWatchlistSeriesCollection,
  getWatchlistAnimeCollection,
  getWatchlistCartoonCollection
} from '../firebase/firebase';

const useMediaStore = create((set, get) => ({
  films: [],
  series: [],
  anime: [],
  cartoon: [],
  watchlistFilms: [],
  watchlistSeries: [],
  watchlistAnime: [],
  watchlistCartoon: [],
  loading: false,
  error: null,
  currentView: 'films', // 'films', 'series', 'anime', 'cartoon'
  isWatchlist: false,
  
  // Set current view
  setCurrentView: (view) => {
    set({ currentView: view });
    get().fetchCurrentCollection();
  },

  // Toggle between watchlist and main collection
  toggleWatchlist: () => {
    const { isWatchlist } = get();
    set({ isWatchlist: !isWatchlist });
    get().fetchCurrentCollection();
  },

  // Fetch current collection based on view and watchlist status
  fetchCurrentCollection: async () => {
    const { currentView, isWatchlist } = get();
    get().fetchCollection(currentView, isWatchlist);
  },

  // Fetch specific collection
  fetchCollection: async (type, isWatchlist = false) => {
    set({ loading: true, error: null });
    try {
      let data;
      if (isWatchlist) {
        switch (type) {
          case 'films':
            data = await getWatchlistFilmsCollection();
            set({ watchlistFilms: data });
            break;
          case 'series':
            data = await getWatchlistSeriesCollection();
            set({ watchlistSeries: data });
            break;
          case 'anime':
            data = await getWatchlistAnimeCollection();
            set({ watchlistAnime: data });
            break;
          case 'cartoon':
            data = await getWatchlistCartoonCollection();
            set({ watchlistCartoon: data });
            break;
          default:
            throw new Error('Invalid collection type');
        }
      } else {
        switch (type) {
          case 'films':
            data = await getFilmsCollection();
            set({ films: data });
            break;
          case 'series':
            data = await getSeriesCollection();
            set({ series: data });
            break;
          case 'anime':
            data = await getAnimeCollection();
            set({ anime: data });
            break;
          case 'cartoon':
            data = await getCartoonCollection();
            set({ cartoon: data });
            break;
          default:
            throw new Error('Invalid collection type');
        }
      }
      set({ loading: false });
    } catch (error) {
      set({ error, loading: false });
      console.error(`Error fetching ${type} collection:`, error);
    }
  },

  // Fetch all collections
  fetchAllCollections: async () => {
    set({ loading: true, error: null });
    try {
      const [films, series, anime, cartoon] = await Promise.all([
        getFilmsCollection(),
        getSeriesCollection(),
        getAnimeCollection(),
        getCartoonCollection()
      ]);
      
      set({ 
        films, 
        series, 
        anime, 
        cartoon, 
        loading: false 
      });
    } catch (error) {
      set({ error, loading: false });
      console.error("Error fetching all collections:", error);
    }
  },

  // Fetch all watchlist collections
  fetchAllWatchlists: async () => {
    set({ loading: true, error: null });
    try {
      const [watchlistFilms, watchlistSeries, watchlistAnime, watchlistCartoon] = await Promise.all([
        getWatchlistFilmsCollection(),
        getWatchlistSeriesCollection(),
        getWatchlistAnimeCollection(),
        getWatchlistCartoonCollection()
      ]);
      
      set({ 
        watchlistFilms, 
        watchlistSeries, 
        watchlistAnime, 
        watchlistCartoon, 
        loading: false 
      });
    } catch (error) {
      set({ error, loading: false });
      console.error("Error fetching all watchlists:", error);
    }
  },

  // Legacy functions for backward compatibility
  fetchFilms: async () => {
    get().fetchCollection('films', false);
  },

  fetchSeries: async () => {
    get().fetchCollection('series', false);
  },

  // Refresh individual collections
  refreshFilms: async () => {
    get().fetchCollection('films', false);
  },
  
  refreshSeries: async () => {
    get().fetchCollection('series', false);
  },

  refreshAnime: async () => {
    get().fetchCollection('anime', false);
  },

  refreshCartoon: async () => {
    get().fetchCollection('cartoon', false);
  },

  // Get current collection data
  getCurrentCollectionData: () => {
    const { currentView, isWatchlist, films, series, anime, cartoon, watchlistFilms, watchlistSeries, watchlistAnime, watchlistCartoon } = get();
    
    if (isWatchlist) {
      switch (currentView) {
        case 'films': return watchlistFilms;
        case 'series': return watchlistSeries;
        case 'anime': return watchlistAnime;
        case 'cartoon': return watchlistCartoon;
        default: return [];
      }
    } else {
      switch (currentView) {
        case 'films': return films;
        case 'series': return series;
        case 'anime': return anime;
        case 'cartoon': return cartoon;
        default: return [];
      }
    }
  }
}));

export default useMediaStore;