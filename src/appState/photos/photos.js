/* global window */

import { create } from 'apisauce';
import parse from 'parse-jsonp';

let FLICKR_API_KEY = '';

if (process && process.env) {
  FLICKR_API_KEY = process.env.RAZZLE_FLICKR_API_KEY;
}

let baseURL = `https://api.flickr.com/services/rest?method=flickr.photos.getRecent&api_key=${FLICKR_API_KEY}&format=json&extras=description,tags,owner_name`;

// Quick fix to enable local development
if (typeof window !== 'undefined' && window.location.href === 'http://localhost:3000/') {
  baseURL = 'http://localhost:3000/photos';
}

export const api = create({
  baseURL,
});

export const initialState = {
  retrievedPhotos: [],
  filteredPhotos: [],
};

export const RETRIEVE_PHOTOS = 'RETRIEVE_PHOTOS';
export const FILTER_PHOTOS = 'FILTER_PHOTOS';

export const retrievePhotos = () => {
  const request = api.get('');

  return {
    type: RETRIEVE_PHOTOS,
    payload: request,
  };
};

export const filterPhotos = (searchTerm) => ({
  type: FILTER_PHOTOS,
  searchTerm,
});

const photosReducer = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case RETRIEVE_PHOTOS: {
      const data = parse('jsonFlickrApi', action.payload.data);
      if (data && data.photos) {
        const { photo } = data.photos;
        return {
          retrievedPhotos: [].concat(state.retrievedPhotos).concat(photo),
          filteredPhotos: state.filteredPhotos,
        };
      }
      return state;
    }
    case FILTER_PHOTOS: {
      if (action.searchTerm && action.searchTerm.length > 0) {
        const searchTermLowered = action.searchTerm.toLowerCase();
        const filteredPhotos = state.retrievedPhotos.reduce((pv, cv) => {
          const { title, ownername, tags } = cv;
          if (
            title.toLowerCase().indexOf(searchTermLowered) > -1
            || ownername.toLowerCase().indexOf(searchTermLowered) > -1
            || tags.toLowerCase().indexOf(searchTermLowered) > -1
          ) {
            return pv.concat([cv]);
          }
          return pv;
        }, []);
        return {
          retrievedPhotos: state.retrievedPhotos,
          filteredPhotos,
        };
      }
      return {
        retrievedPhotos: state.retrievedPhotos,
        filteredPhotos: [],
      };
    }
    default: return state;
  }
};

export default photosReducer;
