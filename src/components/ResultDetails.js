import _ from 'lodash';
import React, { Component } from 'react';
import { Bar } from 'react-chartjs';
import Candidates from './Candidates';
import numeral, { colors } from '../utils/index';

const BarChart = Bar;

export default class ResultDetails extends Component {

  getChartData(labels, label1, data1, label2, data2) {
    return {
      labels: labels,
      datasets: [{
        label: label1,
        fillColor: colors[2],
        data: data1
      }, {
        label: label2,
        fillColor: colors[3],
        data: data2
      }]
    };
  }

  formatNumber(string) {
    return numeral(string).format('0,0');
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

    const candidates = this.props.candidates;

    const chartData = this.props.chartData,
          avgParticipation = _.mean(chartData.voters),
          highParticScore = _.max(chartData.voters),
          highParticRegion = chartData.subregions[chartData.voters.indexOf(highParticScore)],
          lowParticScore = _.min(chartData.voters),
          lowParticRegion = chartData.subregions[chartData.voters.indexOf(lowParticScore)];

    const avgValid = _.mean(chartData.valid);

    return (
      <div className="result-details">
        <div className="row small-11 medium-10 large-9 columns">
          <h3>Kandidat Pasangan Calon</h3>
          <hr/>
          <Candidates candidates={candidates} data={this.props.chartData} />

          <h3>Partisipasi Masyarakat</h3>
          <hr/>
          <div className="row">
            <div className="small-12 medium-4 columns">
              <h4>Tingkat Partisipasi</h4>
              <dl>
                <dt>Rata-rata</dt>
                <dd>{this.formatNumber(avgParticipation)} pengguna hak pilih per Kecamatan.</dd>

                <dt>Daerah partisipasi tertinggi</dt>
                <dd><span className="capitalize">{highParticRegion.toLowerCase()}</span> ({this.formatNumber(highParticScore)} jiwa)</dd>

                <dt>Daerah partisipasi terendah</dt>
                <dd><span className="capitalize">{lowParticRegion.toLowerCase()}</span> ({this.formatNumber(lowParticScore)} jiwa)</dd>
              </dl>
            </div>
            <div className="small-12 medium-8 columns">
              <BarChart data={rightToVote} options={{responsive: true}} redraw />
            </div>
          </div>
          
          <br/>

          <h3>Hasil Rekapitulasi Suara</h3>
          <hr/>
          <di className="row">
            <div className="small-12 medium-8 columns">
              <BarChart data={resultOfVote} options={{responsive: true}} redraw />
            </div>
            <div className="small-12 medium-4 columns">
              <h4>Tingkat keabsahan suara</h4>
              <p>Rata-rata tingkat keabsahan suara di daerah <span className="capitalize">{this.props.region.toLowerCase()}</span> adalah sebesar {this.formatNumber(avgValid)} per Kecamatan.</p>
            </div>
          </di>
          
        </div>
      </div>
    );
  }
}