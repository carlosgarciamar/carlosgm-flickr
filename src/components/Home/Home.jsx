/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import ImageDisplay from '../ImageDisplay';
import PhotoLoader from '../../containers/PhotoLoaderContainer';

import s from './Home.module.css';

const Home = ({
  retrievePhotos,
  photos,
  filterPhotos,
  filteredPhotos,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    retrievePhotos();
  }, []);

  if (!photos || photos.length === 0) {
    return null;
  }

  const photosToDisplay = filteredPhotos && filteredPhotos.length > 0
    ? filteredPhotos
    : photos;

  return (
    <div className="container">
      <div className={s.inputContainer}>
        <label>
          <span className={s.label}>Search:</span>
          <input
            className={s.input}
            placeholder="Title, tag or author"
            data-testid="Home__SearchInput"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              filterPhotos(e.target.value);
            }}
          />
        </label>
      </div>
      <div className={s.list}>
        {
          photosToDisplay.map((photo) => (
            <ImageDisplay
              key={photo.id}
              photoUrl={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
              title={photo.title}
              author={photo.ownername}
              authorUrl={`https://www.flickr.com/photos/${photo.owner}/`}
              // eslint-disable-next-line no-underscore-dangle
              description={`${photo.description._content}`}
              tags={photo.tags}
            />
          ))
        }
      </div>
      <PhotoLoader />
    </div>
  );
};

Home.propTypes = {
  retrievePhotos: PropTypes.func.isRequired,
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
  filterPhotos: PropTypes.func.isRequired,
  filteredPhotos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Home;
