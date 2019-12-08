import { create } from 'apisauce';

const baseURL = 'https://api.flickr.com';

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
    default: return state;
  }
};

export default photosReducer;
