import MockAdaptor from 'axios-mock-adapter';
import promiseMiddleware from 'redux-promise';
import configureMockStore from 'redux-mock-store';

import payloads from '../../constants/MockResponses';

import {
  initialState,
  retrievePhotos,
  RETRIEVE_PHOTOS,
  api,
} from '.';

describe('appState > photos', () => {
  describe('reducer', () => {});

  describe('async actions', () => {
    let mock;
    let store;

    const middlewares = [promiseMiddleware];
    const mockStore = configureMockStore(middlewares);

    beforeEach(() => {
      mock = new MockAdaptor(api.axiosInstance);
      store = mockStore(initialState);
    });

    it('should be able to create a photo to retrieve the photos from the API', () => {
      const expectedAction = {
        type: RETRIEVE_PHOTOS,
        payload: {
          data: payloads.getImages,
        },
      };

      mock
        .onGet('https://api.flickr.com/services/feeds/photos_public.gne?format=json')
        .replyOnce(200, expectedAction.payload.data);

      return store
        .dispatch(retrievePhotos())
        .then(() => {
          const action = store.getActions()[0];
          expect(action.type).toEqual(expectedAction.type);
          expect(action.payload.data).toEqual(expectedAction.payload.data);
        });
    });
  });
});
