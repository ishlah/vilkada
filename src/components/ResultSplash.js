import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Doughnut } from 'react-chartjs';

const DoughnutChart = Doughnut;

class ResultSplash extends Component {
  render() {

    let chartData = [
      {
        color: '#2199e8',
        highlight: '#2199e6',
        label: 'Memilih',
        value: 85434
      },
      {
        color: '#fff',
        highlight: '#eee',
        label: 'Tidak memilih',
        value: 200000 - 85434
      }
    ];

    return (
      <div className="result-splash" 
        style={{backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(/images/bogor_palace_front.jpg)'}}>
        <div className="splash-infographic">
          <div className="splash-header">
            <h1 className="splash-title">{this.props.selectedRegion}</h1>
            <p>{Object.keys(this.props.recapitulation).length} Daerah Pemilihan</p>
          </div>
          <div className="splash-body row">
            <div className="small-12 medium-4 large-4 columns">
              <DoughnutChart data={chartData} options={{responsive: true}} />
              <div className="text-info">
                <h2>85.434</h2>
                <p>dari 200.000 jiwa<br/>menggunakan hak pilihnya</p>
              </div>
            </div>
            <div className="small-12 medium-4 large-4 columns">
              <DoughnutChart data={chartData} options={{responsive: true}} />
              <div className="text-info">
                <h2>85.434</h2>
                <p>dari 200.000 suara sah</p>
              </div>
            </div>
            <div className="small-12 medium-4 large-4 columns">
              <DoughnutChart data={chartData} options={{responsive: true}} />
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

function mapStatToProps({ selectedRegion, regionsRecapitulation}) {
  const {
    isFetching,
    recapitulation
  } = regionsRecapitulation[selectedRegion] || {
    isFetching: true,
    recapitulation: []
  };

  return {
    selectedRegion,
    recapitulation,
    isFetching
  };
}

export default connect(mapStatToProps)(ResultSplash);