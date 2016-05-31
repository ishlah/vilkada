import React, { Component } from 'react';

import CandidateCard from './CandidateCard';

export default class Candidates extends Component {
  render() {

    const candidates = this.props.candidates;
    
    return (
      <div className="candidates">
        <div className="row small-centered align-center" data-equalizer data-equalizer-on="medium">
          {candidates.map((candidate, id) =>
            <CandidateCard
              key={id}
              candidate={candidate} />
          )}
        </div>
      </div>
    );
  }
}