import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Home.css';

const Home = ({
  retrievePhotos,
}) => {
  useEffect(() => {
    retrievePhotos();
  });

  return (
    <div className="Home">
      <div className="Home-header">
        <h2>Welcome to Razzle</h2>
      </div>
      <ul className="Home-resources">
        <li>
          <a href="https://github.com/jaredpalmer/razzle">Docs</a>
        </li>
        <li>
          <a href="https://github.com/jaredpalmer/razzle/issues">Issues</a>
        </li>
        <li>
          <a href="https://palmer.chat">Community Slack</a>
        </li>
      </ul>
    </div>
  );
};

Home.propTypes = {
  retrievePhotos: PropTypes.func.isRequired,
};

export default Home;
