/* global window */

import { create } from 'apisauce';
import parse from 'parse-jsonp';

let baseURL = 'https://api.flickr.com';

// Quick fix to enable local development despite API not supporting CORS for localhost
if (typeof window !== 'undefined' && window.location.href === 'http://localhost:3000/') {
  baseURL = `https://cors-anywhere.herokuapp.com/${baseURL}`;
}

export const api = create({
  baseURL,
});

export const initialState = {};

export const RETRIEVE_PHOTOS = 'RETRIEVE_PHOTOS';

export const retrievePhotos = () => {
  const request = api.get('/services/feeds/photos_public.gne?format=json');

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
      if (data) {
        const { items } = data;
        return items;
      }
    }
      return state;
    default: return state;
  }
};

export default photosReducer;
