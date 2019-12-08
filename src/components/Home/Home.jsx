import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import ImageDisplay from '../ImageDisplay';

import s from './Home.module.css';

const Home = ({
  retrievePhotos,
  photos,
}) => {
  useEffect(() => {
    retrievePhotos();
  }, []);

  const loadMore = () => {
    console.log('Load more...');
  };

  if (!photos || photos.length === 0) {
    return null;
  }

  return (
    <div className="container">
      <div className={s.list}>
        {
          photos.map((photo) => (
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
    </div>
  );
};

Home.propTypes = {
  retrievePhotos: PropTypes.func.isRequired,
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Home;
