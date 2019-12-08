/* global window */

import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import s from './PhotoLoader.module.css';

const PhotoLoader = ({
  retrievePhotos,
}) => {
  const [isLoading, setIsLoading] = useState(null);
  const divRef = useRef();

  const retrievePhotosWrapper = () => {
    if (isLoading === null) {
      const timer = setTimeout(() => {
        setIsLoading(null);
      }, 500);
      setIsLoading(timer);
      retrievePhotos();
    }
  };

  const isInView = () => {
    const node = divRef && divRef.current ? divRef.current : null;
    if (node && node.getBoundingClientRect
      && typeof window !== 'undefined' && window.scrollY) {
      const {
        top,
        left,
        bottom,
        right,
      } = node.getBoundingClientRect();
      const { innerHeight, innerWidth } = window;

      if (top >= 0 && left >= 0 && bottom < innerHeight && right < innerWidth) {
        retrievePhotosWrapper();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', isInView);

    return () => {
      window.removeEventListener('scroll', isInView);
      if (isLoading) {
        clearTimeout(isLoading);
      }
    };
  }, []);

  return (
    <>
      <div ref={divRef} className={s.photoLoader}>
        Loading more photos...
      </div>
    </>
  );
};

PhotoLoader.propTypes = {
  retrievePhotos: PropTypes.func.isRequired,
};

export default PhotoLoader;
