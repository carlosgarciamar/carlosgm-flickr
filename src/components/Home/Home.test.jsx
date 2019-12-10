/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { act, create } from 'react-test-renderer';

import ImageDisplay from '../ImageDisplay';
import PhotoLoader from '../../containers/PhotoLoaderContainer';
import Home from '.';

jest.mock('../ImageDisplay', () => () => 'ImageDisplay');
jest.mock('../../containers/PhotoLoaderContainer', () => () => 'PhotoLoader');

describe('<Home />', () => {
  const retrievePhotos = jest.fn();
  const filterPhotos = jest.fn();
  const props = {
    retrievePhotos,
    photos: [],
    filterPhotos,
    filteredPhotos: [],
  };
  it('should call retrievePhotos once on mount', () => {
    jest.resetAllMocks();
    act(() => {
      create(<Home {...props} />);
    });
    expect(retrievePhotos).toHaveBeenCalledTimes(1);
  });

  it('should render as many ImageDisplay as photos passed', () => {
    jest.resetAllMocks();
    let element;
    const photos = [
      {
        id: '1',
        description: {},
      },
      {
        id: '2',
        description: {},
      },
      {
        id: '3',
        description: {},
      },
    ];
    act(() => {
      element = create(<Home {...props} photos={photos} />);
    });
    const { root } = element;
    expect(root.findAllByType(ImageDisplay)).toHaveLength(3);
  });

  it('should call filterPhotos with the search term onChange of the input and update value of the input', () => {
    jest.resetAllMocks();
    const value = 'search term';
    const photos = [
      {
        id: '1',
        description: {},
      },
      {
        id: '2',
        description: {},
      },
      {
        id: '3',
        description: {},
      },
    ];
    let element;
    act(() => {
      element = create(<Home {...props} photos={photos} />);
    });
    const { root } = element;
    const input = root.findByProps({ 'data-testid': 'Home__SearchInput' });
    act(() => {
      input.props.onChange({ target: { value } });
    });
    expect(filterPhotos).toHaveBeenCalledTimes(1);
    expect(filterPhotos).toHaveBeenCalledWith(value);
    expect(input.props.value).toBe(value);
  });

  it('should render filteredPhotos rather than photos and hide PhotoLoader if both available', () => {
    jest.resetAllMocks();
    let element;
    const photos = [
      {
        id: '1',
        description: {},
      },
      {
        id: '2',
        description: {},
      },
      {
        id: '3',
        description: {},
      },
    ];
    const filteredPhotos = [
      {
        id: '1',
        description: {},
      },
    ];
    act(() => {
      element = create(<Home {...props} photos={photos} filteredPhotos={filteredPhotos} />);
    });
    const { root } = element;
    expect(root.findAllByType(ImageDisplay)).toHaveLength(1);
    expect(root.findAllByType(PhotoLoader)).toHaveLength(0);
  });
});
