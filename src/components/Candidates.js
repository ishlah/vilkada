import React, { Component } from 'react';
import { connect } from 'react-redux';

import CandidateCard from './CandidateCard';

class Candidates extends Component {
  render() {

    const candidates = this.props.candidates;
    
    return (
      <div className="candidates">
        <div className="row" data-equalizer data-equalizer-on="medium">
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

function mapStateToProps({ selectedRegionId, candidates}) {
  const regionCandidates = candidates[selectedRegionId]
  return {candidates: regionCandidates};
}

export default connect(mapStateToProps)(Candidates);