import MockAdaptor from 'axios-mock-adapter';
import promiseMiddleware from 'redux-promise';
import configureMockStore from 'redux-mock-store';

import payloads from '../../constants/MockResponses';

import reducer, {
  initialState,
  retrievePhotos,
  RETRIEVE_PHOTOS,
  api,
  FILTER_PHOTOS,
  filterPhotos,
} from '.';

jest.mock('parse-jsonp', () => (hook, string) => string);

describe('appState > photos', () => {
  describe('reducer', () => {
    it('populates the state with the items in the payload from the action RETRIEVE_PHOTOS', () => {
      const testAction = {
        type: RETRIEVE_PHOTOS,
        payload: {
          data: payloads.getImages,
        },
      };
      const expectedState = {
        retrievedPhotos: [].concat(testAction.payload.data.photos.photo),
        filteredPhotos: [],
      };
      expect(reducer(initialState, testAction)).toEqual(expectedState);
    });

    it('add the photos twice if called twice', () => {
      const testAction = {
        type: RETRIEVE_PHOTOS,
        payload: {
          data: payloads.getImages,
        },
      };
      const newState = reducer(initialState, testAction);
      const expectedState = Object.assign(initialState, {
        retrievedPhotos: []
          .concat(testAction.payload.data.photos.photo)
          .concat(testAction.payload.data.photos.photo),
      });
      expect(reducer(newState, testAction)).toEqual(expectedState);
    });

    it('filters the photos when receiving the FILTER_PHOTOS action', () => {
      const searchTerm = 'london';
      const testAction = {
        type: FILTER_PHOTOS,
        searchTerm,
      };
      const newInitialState = Object.assign(
        initialState,
        { retrievedPhotos: [].concat(payloads.getImages.photos.photo) },
      );
      expect(reducer(newInitialState, testAction).filteredPhotos).toHaveLength(2);
    });

    xit('resets the filter when receiving an empty searchTerm in the FILTER_PHOTOS action', () => {
      const searchTerm = '';
      const testAction = {
        type: FILTER_PHOTOS,
        searchTerm,
      };
      const newInitialState = Object.assign(
        initialState,
        { retrievedPhotos: [].concat(payloads.getImages.photos.photo) },
      );
      expect(reducer(newInitialState, testAction).filteredPhotos).toHaveLength(0);
    });
  });

  describe('sync actions', () => {
    it('should be able to create an action to filter the photos', () => {
      const searchTerm = 'london';
      const expectedAction = {
        type: FILTER_PHOTOS,
        searchTerm,
      };
      expect(filterPhotos(searchTerm)).toEqual(expectedAction);
    });
  });

  describe('async actions', () => {
    let mock;
    let store;

    const middlewares = [promiseMiddleware];
    const mockStore = configureMockStore(middlewares);

    beforeEach(() => {
      mock = new MockAdaptor(api.axiosInstance);
      store = mockStore(initialState);
    });

    it('should be able to create an action to retrieve the photos from the API', () => {
      const expectedAction = {
        type: RETRIEVE_PHOTOS,
        payload: {
          data: payloads.getImages,
        },
      };

      mock
        .onGet('')
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
