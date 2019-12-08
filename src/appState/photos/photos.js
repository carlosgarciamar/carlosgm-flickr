/* global window */

import { create } from 'apisauce';
import parse from 'parse-jsonp';

let baseURL = 'http://localhost:3000/photos';

// https://api.flickr.com/services/rest?method=flickr.photos.getRecent&api_key={API_KEY}&format=json

// Quick fix to enable local development
if (typeof window !== 'undefined' || window.location.href === 'http://localhost:3000/') {
  baseURL = 'http://localhost:3000/photos';
}

export const api = create({
  baseURL,
});

export const initialState = [];

export const RETRIEVE_PHOTOS = 'RETRIEVE_PHOTOS';

export const retrievePhotos = () => {
  const request = api.get('');

  return {
    type: RETRIEVE_PHOTOS,
    payload: request,
  };
};

const photosReducer = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case RETRIEVE_PHOTOS: {
      const data = parse('jsonFlickrFeed', action.payload.data);
      if (data && data.photos) {
        const { photo } = data.photos;
        return [].concat(photo);
      }
      return state;
    }
    default: return state;
  }
};

export default photosReducer;
