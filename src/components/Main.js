import 'styles/bootstrap.css';
import 'styles/app.scss';
import React from 'react';
import { Component } from 'react';

import SearchBar from './SearchBar';
import RegionList from './RegionList';

export default class App extends Component {
  render() {
    return (
      <div>
        <h3>Search PILKADA 2015 Recapitulation</h3>
        <SearchBar />
        <hr/>
        <RegionList />
      </div>
    );
  }
}
