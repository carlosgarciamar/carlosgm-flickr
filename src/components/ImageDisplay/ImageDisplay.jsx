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
    <div>
      <a href={photoUrl} target="__blank">{title}</a>
      &nbsp;by&nbsp;
      <a href={authorUrl} target="__blank">{author}</a>
    </div>
    {
      description
        ? (
          <div>{description}</div>
        )
        : null
    }
    {
      tags
        ? (
          <div>{tags}</div>
        )
        : null
    }
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
