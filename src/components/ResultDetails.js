import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs'

const BarChart = Bar;

class Result extends Component {

  getVotersData(regions) {
    let subregions= [],
        listedVoters= [],
        voteUsers= [];

    regions.map(region => {
      subregions.push(region.nama_kab_kota);
      listedVoters.push(region.pemilih);
      voteUsers.push(region.pengguna_hak_pilih);
    });

    return { subregions, listedVoters, voteUsers };
  }

  convertToInt(string) {
    let splitted = string.split('.');
    let concatenated = splitted[0].concat(splitted[1]);
    let number = parseInt(concatenated);

    return number;
  }

  getVotesData(regions) {
    let labels= [],
        valid= [],
        invalid= [],
        total = 0;

    regions.map(region => {
      labels.push(region.nama_kab_kota);
      valid.push(region.suara_sah);
      invalid.push(region.suara_tidak_sah);
      total += this.convertToInt(region.total_suara);
    });

    return { labels, valid, invalid, total };
  }

  getChartData(subregions, label1, voteUsers, label2, listedVoters) {
    return {
      labels: subregions,
      datasets: [{
        label: label1,
        fillColor: 'rgba(255,99,132,0.2)',
        strokeColor: 'rgba(255,99,132,1)',
        hoverBackgroundColor: 'rgba(255,99,132,0.5)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: voteUsers,
      }, {
        label: label2,
        fillColor: 'rgba(54,162,235,0.2)',
        strokeColor: 'rgba(54,162,235,1)',
        hoverBackgroundColor: 'rgba(54,162,235,0.5)',
        hoverBorderColor: 'rgba(54,162,235,1)',
        data: listedVoters
      }]
    };
  }

  render() {

    let {subregions, listedVoters, voteUsers} = this.getVotersData(this.props.recapitulation);
    let votersData = this.getChartData(
        subregions,
        'Pemilih terdaftar', listedVoters,
        'Pengguna hak pilih', voteUsers
      );

    let { labels, valid, invalid, total } = this.getVotesData(this.props.recapitulation);
    let votesData = this.getChartData(
        labels,
        'Suara tidak sah', invalid,
        'Suara sah', valid
      );

    return (    
      <div className="result-details">
        <div className="row small-11 medium-9 large-8 columns">
          <h3>Hak Pilih</h3>
          <BarChart data={votersData} options={{ responsive: true }} redraw />

          <br/>

          <h3>Hasil Rekap Suara</h3>
          <BarChart data={votesData} options={{ responsive: true }} redraw />
          <p>Total suara: {total}</p>
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

export default connect(mapStatToProps)(Result);