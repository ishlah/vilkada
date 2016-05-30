import React, { Component } from 'react';
import numeral from 'numeral';
import { Doughnut } from 'react-chartjs';

const DoughnutChart = Doughnut;

export default class ResultSplash extends Component {

  getDoughnutData(label1, data1, label2, data2) {
    return [
      {
        color: '#2199e8',
        highlight: '#2199e6',
        label: label1,
        value: data1
      },
      {
        color: '#fff',
        highlight: '#eee',
        label: label2,
        value: data2
      }
    ];
  }

  toPercentage(number){
    return numeral(number).format('0.00%');
  }

  numToString(number) {
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
              <DoughnutChart data={voters} options={{responsive: true}} />
              <div className="text-info">
                <h2>85.434 <small>suara</small></h2>
                <p>diperoleh kandidat no urut 1<br/>(Pemenang)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}