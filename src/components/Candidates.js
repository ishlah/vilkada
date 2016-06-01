import React, { Component } from 'react';
import { colors } from '../utils/index';

import CandidateCard from './CandidateCard';

import { Bar } from 'react-chartjs';
const BarChart = Bar;

export default class Candidates extends Component {

  getChartData(number, dataChar) {
    
    let labels = dataChar.subregions,
        datasets = [];

    for (var i = 0; i < number; i++) {
      datasets.push({
        label: `Pasangan Calon no ${i+1}`,
        fillColor: colors[i + 2],
        data: dataChar.candidatesScore[i]
      })
    }

    return {
      labels,
      datasets
    }
  }

  render() {

    const candidates = this.props.candidates,
          number = candidates.length,
          scores = this.getChartData(number, this.props.data);

    
    return (
      <div className="candidates">
        <div className="row small-centered align-center" data-equalizer data-equalizer-on="medium">
          {candidates.map((candidate, id) =>
            <CandidateCard
              key={id}
              id={id}
              candidate={candidate}
              data={this.props.data} />
          )}
        </div>
        <div className="candidate-score-chart">

          <BarChart data={scores} options={{responsive: true}} redraw />

        </div>
      </div>
    );
  }
}