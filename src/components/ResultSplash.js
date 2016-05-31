import _ from 'lodash';
import React, { Component } from 'react';
import numeral from 'numeral';
import { Doughnut } from 'react-chartjs';

const DoughnutChart = Doughnut;
const colors = [
'#b2182b',
'#d6604d',
'#f4a582',
'#fddbc7',
'#f7f7f7',
'#d1e5f0',
'#92c5de',
'#4393c3',
'#2166ac'
];

export default class ResultSplash extends Component {

  getCandidatesDoughnut(number, scores) {

    let data = [],
        totalScores = [];

    
    for (var i = 0; i < number; i++) {
      data.push(
        {
          color: colors[i],
          highlight: colors[i+1],
          label: `No. urut ${i+1}`,
          value: _.sum(scores[i])
        }
      );

      totalScores.push(_.sum(scores[i]));
    }

    return {totalScores, data};
  }

  getDoughnutData(label1, data1, label2, data2) {
    return [
      {
        color: colors[1],
        highlight: colors[2],
        label: label1,
        value: data1
      },
      {
        color: colors[0],
        highlight: colors[1],
        label: label2,
        value: data2
      }
    ];
  }

  toPercentage(number){
    /**
    * Convert number into percentage
    */
    return numeral(number).format('0.00%');
  }

  numToString(number) {
    /**
    * Convert number into formatted string (12000 -> 12.000)
    */
    return numeral(number).format('0,0');
  }

  render() {

    const doughnutData = this.props.chartData;
    const voters = this.getDoughnutData(
      'Memilih', doughnutData.totalVoters,
      'Tidak Memilih', doughnutData.totalListedVoters - doughnutData.totalVoters
    );
    const votes = this.getDoughnutData(
      'Sah', doughnutData.totalValidVotes,
      'Tidak Sah', doughnutData.totalInvalidVotes
    );
    const candidates = this.props.candidates,
          candidatesScore = doughnutData.candidatesScore,
          numOfCandidates = candidates.length;

    const candidatesScoreDoughnut = this.getCandidatesDoughnut(numOfCandidates, candidatesScore);
    const theWinningScore = _.max(candidatesScoreDoughnut.totalScores);
    const theWinner = _.indexOf(candidatesScoreDoughnut.totalScores, theWinningScore) + 1;

    return (
      <div className="result-splash"
        style={{backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(/images/bogor_palace_front.jpg)'}}>
        <div className="splash-infographic">
          <div className="splash-header">
            <h1 className="splash-title">{this.props.region}</h1>
            <p>{Object.keys(doughnutData.subregions).length} Daerah Pemilihan</p>
          </div>
          <div className="splash-body row">
            <div className="small-12 medium-4 large-4 columns">
              <DoughnutChart data={voters} options={{responsive: true}} />
              <div className="text-info">
                <h2>{this.toPercentage(doughnutData.totalVoters/doughnutData.totalListedVoters)}</h2>
                <p>dari <strong>{this.numToString(doughnutData.totalListedVoters)}</strong> jiwa<br/>menggunakan hak pilihnya</p>
              </div>
            </div>
            <div className="small-12 medium-4 large-4 columns">
              <DoughnutChart data={votes} options={{responsive: true}} />
              <div className="text-info">
                <h2>{this.toPercentage(doughnutData.totalValidVotes/(doughnutData.totalValidVotes + doughnutData.totalInvalidVotes))}</h2>
                <p>suara sah<br/>dari <strong>{this.numToString(doughnutData.totalValidVotes + doughnutData.totalInvalidVotes)}</strong> total suara</p>
              </div>
            </div>
            <div className="small-12 medium-4 large-4 columns">
              <DoughnutChart data={candidatesScoreDoughnut.data} options={{responsive: true}} />
              <div className="text-info">
                <h2>{this.toPercentage(theWinningScore/_.sum(candidatesScoreDoughnut.totalScores))} <small>suara</small></h2>
                <p>diperoleh kandidat<br/>no urut <strong>{theWinner}</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}