/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { act, create } from 'react-test-renderer';

import Home from '.';

describe('<Home />', () => {
  const retrievePhotos = jest.fn();
  const props = {
    retrievePhotos,
    photos: [],
  };
  it('should call retrievePhotos once on mount', () => {
    jest.resetAllMocks();
    act(() => {
      create(<Home {...props} />);
    });
    expect(retrievePhotos).toHaveBeenCalledTimes(1);
  });
});
