import React, { Component } from 'react';
import _ from 'lodash';

import ResultSplash from './ResultSplash';
import ResultDetails from './ResultDetails';

export default class Result extends Component {

  convertToInt(string) {
    let splitted = string.split('.');
    let concatenated = splitted[0].concat(splitted[1]);
    let number = parseInt(concatenated);

    return number;
  }

  getResultData(regions) {
    let subregions= [];
    
    let listedVoters= [],
        voters= [],
        totalListedVoters = 0,
        totalVoters = 0;
    
    let valid= [],
        invalid= [],
        totalVotes= 0,
        totalValidVotes= 0,
        totalInvalidVotes= 0;

    regions.map(region => {
      subregions.push(region.nama_kab_kota);
      listedVoters.push(this.convertToInt(region.pemilih));
      voters.push(this.convertToInt(region.pengguna_hak_pilih));
      valid.push(this.convertToInt(region.suara_sah));
      invalid.push(this.convertToInt(region.suara_tidak_sah));
      totalVotes += this.convertToInt(region.total_suara);
    });

    totalListedVoters = _.sum(listedVoters);
    totalVoters = _.sum(voters);

    totalValidVotes = _.sum(valid);
    totalInvalidVotes = _.sum(invalid);

    return {
      subregions,
      listedVoters, voters, totalListedVoters, totalVoters,
      valid, invalid, totalVotes, totalValidVotes, totalInvalidVotes
    };
  }

  render() {
    const chartData = this.getResultData(this.props.subregions)

    return (
      <div className="result-container" id="result">
        <ResultSplash region={this.props.region} chartData={chartData} />
        <ResultDetails chartData={chartData} />
      </div>
    );
  }
}