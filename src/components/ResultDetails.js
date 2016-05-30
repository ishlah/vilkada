import React, { Component } from 'react';
import { Bar } from 'react-chartjs'

const BarChart = Bar;

export default class Result extends Component {

  getChartData(labels, label1, data1, label2, data2) {
    return {
      labels: labels,
      datasets: [{
        label: label1,
        fillColor: 'rgba(255,99,132,0.2)',
        strokeColor: 'rgba(255,99,132,1)',
        hoverBackgroundColor: 'rgba(255,99,132,0.5)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: data1
      }, {
        label: label2,
        fillColor: 'rgba(54,162,235,0.2)',
        strokeColor: 'rgba(54,162,235,1)',
        hoverBackgroundColor: 'rgba(54,162,235,0.5)',
        hoverBorderColor: 'rgba(54,162,235,1)',
        data: data2
      }]
    };
  }

  render() {

    const rightToVote = this.getChartData(
      this.props.chartData.subregions,
      'Pemilih terdaftar', this.props.chartData.listedVoters,
      'Pengguna hak pilih', this.props.chartData.voters
    );

    const resultOfVote = this.getChartData(
      this.props.chartData.subregions,
      'Suara tidak sah', this.props.chartData.invalid,
      'Suara sah', this.props.chartData.valid
    );

    return (
      <div className="result-details">
        <div className="row small-11 medium-9 large-8 columns">
          <h3>Hak Pilih</h3>
          <BarChart data={rightToVote} options={{responsive: true}} redraw />
          
          <br/>

          <h3>Hasil Rekap Suara</h3>
          <BarChart data={resultOfVote} options={{responsive: true}} redraw />
          
        </div>
      </div>
    );
  }
}