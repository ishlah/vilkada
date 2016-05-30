import 'styles/app.scss';

import React from 'react';
import { Component } from 'react';

import SearchBar from './SearchBar';
import ResultSplash from './ResultSplash';
import ResultDetails from './ResultDetails';

export default class App extends Component {
  render() {
    return (
      <div>
        <div className="search-container" id="search">
          <div className="search-box">
            <img src="images/vilkada_logo_white.png" alt="Vilkada Logo White" />
            <h1>Vilkada</h1>
            <p className="lead">Visualisasi sederhana hasil Pilkada Langsung 2015</p>
            <SearchBar />
          </div>
        </div>
        <div className="result-container" id="result">
          <ResultSplash />
          <ResultDetails />
        </div>
        <div className="footer text-center">
          <p>Copyleft &copy; <a href="http://ishlah.co">Muhamad Ishlah</a>. Fork me at <a href="https://github.com/ishlah/rekap-pilkada2015">GitHub</a>.</p>
        </div>
      </div>
    );
  }
}
