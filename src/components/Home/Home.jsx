import React from 'react';
import './Home.css';

const Home = () => (
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

export default Home;
