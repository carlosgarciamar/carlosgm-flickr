import React from 'react';
import PropTypes from 'prop-types';

import s from './ImageDisplay.module.css';

const ImageDisplay = ({
  title,
  author,
  photoUrl,
  authorUrl,
  description,
  tags,
}) => (
  <div className={s.wrapper}>
    <img src={photoUrl} alt={title} className={s.image} />
    <div className={s.textWrapper}>
      <a href={photoUrl} target="__blank">{title}</a>
      &nbsp;by&nbsp;
      <a href={authorUrl} target="__blank">{author}</a>
      {
      description
        ? (
          <div className={s.description}>{description}</div>
        )
        : null
      }
      {
        tags
          ? (
            <div className={s.tags}>{tags.split(' ').join(', ')}</div>
          )
          : null
      }
    </div>
  </div>
);

ImageDisplay.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  photoUrl: PropTypes.string.isRequired,
  authorUrl: PropTypes.string.isRequired,
  description: PropTypes.string,
  tags: PropTypes.string,
};

ImageDisplay.defaultProps = {
  description: null,
  tags: null,
};

export default ImageDisplay;
