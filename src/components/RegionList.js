import React, { Component } from 'react';
import { connect } from 'react-redux';

class RegionList extends Component {
  render() {
    return (
      <div>
        <h4>Available regions for {this.props.selectedRegion}</h4>
        <ul className="list-group">
          {this.props.recapitulation.map((subregion, id) =>
            <li className="list-group-item" key={id}>
              {subregion.nama_kab_kota}
            </li>
          )}
        </ul>
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

export default connect(mapStatToProps)(RegionList);