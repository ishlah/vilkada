import 'styles/app.scss';

import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import SearchBar from './SearchBar';
import Result from './Result';

class App extends Component {
  render() {

    const { selectedRegion, recapitulation, isFetching, candidates} = this.props;

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

        {recapitulation.length > 0 &&
          <div className="result-container" id="result" style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Result
              subregions={recapitulation}
              region={selectedRegion}
              candidates={candidates}
              />
          </div>
        }
        <div className="footer text-center">
          <p>Copyleft &copy; <a href="http://ishlah.co">Muhamad Ishlah</a>. Fork me at <a href="https://github.com/ishlah/rekap-pilkada2015">GitHub</a>.</p>
        </div>
      </div>
    );
  }
}

function mapStatToProps({
  selectedRegion,
  regionsRecapitulation,
  selectedRegionId,
  candidates
}) {
  
  const {
    isFetching,
    recapitulation
  } = regionsRecapitulation[selectedRegion] || {
    isFetching: true,
    recapitulation: []
  };

  const regionCandidates = candidates[selectedRegionId]

  return {
    selectedRegion,
    recapitulation,
    isFetching,
    candidates: regionCandidates
  };
}

export default connect(mapStatToProps)(App);
