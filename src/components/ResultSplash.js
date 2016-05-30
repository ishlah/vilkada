import React, { Component } from 'react';
import { connect } from 'react-redux';

class ResultSplash extends Component {
  render() {
    return (
      <div className="result-splash">
        <div className="splash-infographic">
          <div className="splash-header">
            <h1 className="splash-title">{this.props.selectedRegion}</h1>
            <p>{Object.keys(this.props.recapitulation).length} Daerah Pemilihan</p>
          </div>
          <div className="splash-body row">
            <div className="small-4 columns">
              <div>dough chart here</div>
              <p className="text-info">
                85.434 dari 200.000 jiwa <br />
                menggunakan hak pilihnya
              </p>
            </div>
            <div className="small-4 columns">
              <div>dough chart here</div>
              <p className="text-info">85.434 dari 200.000 suara sah</p>
            </div>
            <div className="small-4 columns">
              <div>dough chart here</div>
              <p className="text-info">Kandidat no urut 1 menang dengan 58.000 suara</p>
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