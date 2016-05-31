import _ from 'lodash';
import React, { Component } from 'react';

import ResultSplash from './ResultSplash';
import ResultDetails from './ResultDetails';

export default class Result extends Component {

  convertToInt(string) {
    /**
    * Convert string of recapitulation into number
    * i.e: "32.321" into 32321.
    * try numeral for concise codes!
    */
    if (string !== null) {
      let splitted = string.split('.');
      let concatenated = splitted[0].concat(splitted[1]);
      let number = parseInt(concatenated);

      return number
    }

    return string;
  }

  recostructCandidatesScore(candidatesVotes){
    /*
    * Reconstruct candidates score.
    * return array of each region score for each candidate.
    */
    let candScore = {}

    this.props.candidates.map((val, id) => {
      candScore[id] = []
      candidatesVotes.map(votes => {
        votes.map((score, id3) => {
          if (id3 === id) {
            candScore[id].push(this.convertToInt(score))
          }
        })
      })
    })

    return candScore;
  }

  getResultData(regions) {
    /*
    * Populated recapitulation data for easy visualisation
    * in the children components
    */

    let subregions= [];
    let candidatesVotesResult = [];
    
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
      candidatesVotesResult.push(region.perolehan_suara.split(' '));
    });
    
    // Total listed voters (total pemilih), and voters data
    totalListedVoters = _.sum(listedVoters);
    totalVoters = _.sum(voters);

    // Total valid and invalid votes
    totalValidVotes = _.sum(valid);
    totalInvalidVotes = _.sum(invalid);

    // remove formatting number '[1]' from candidateVote
    let tempArr = [], candidatesVotes = [];
    candidatesVotesResult.map(item => {
      item.map((val, id) => {
        if(id%2 !== 0) tempArr.push(val)
      })
      candidatesVotes.push(tempArr)
      tempArr = []
    })

    // recostruct candidates score
    const candidatesScore = this.recostructCandidatesScore(candidatesVotes);
    
    return {
      subregions,
      listedVoters, voters, totalListedVoters, totalVoters,
      valid, invalid, totalVotes, totalValidVotes, totalInvalidVotes,
      candidatesScore
    };
  }

  render() {
    const chartData = this.getResultData(this.props.subregions);
    const candidates = this.props.candidates;

    return (
      <div className="result-container" id="result">
        <ResultSplash region={this.props.region} chartData={chartData} />
        <ResultDetails chartData={chartData} candidates={candidates} />
      </div>
    );
  }
}