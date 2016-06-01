import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchRegion,
  fetchInitialRegions,
  getRegionDetails
} from '../actions/index';



class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = { term: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.getRegionId = this.getRegionId.bind(this);
  }

  componentDidMount() {
    this.props.fetchInitialRegions();
  }

  onFormSubmit(event) {
    event.preventDefault();

    //  1 - 3 get regionId
    let region = this.state.term,
        regionId = this.getRegionId();

    // 4. dispatch 'getRegionDetails' action creator
    this.props.getRegionDetails(region, regionId);
    // this.props.fetchRegion(region);

    // remove the term from the search field
    this.setState({ term: '' });
  }

  getRegionId() {
    const nameIds = this.props.regionList.nameIds;
    let searchTerm = '',
        regionId = null;

    // fetch region name and region id
    // 1. find if the term has 'kabupaten' on it
    // 2. convert 'kabupaten into kab.'
    searchTerm = this.state.term.replace(/kabupaten/i, 'kab.');

    // 3. based on this new term, find region id in the 'regionList'
    regionId = _.findIndex(nameIds, {nama: searchTerm.toUpperCase()});
    
    return nameIds[regionId].id;
  }

  onInputChange(event) {
    this.setState({ term : event.target.value });
  }

  render() {
    return (
      <div className="row small-11 medium-8 large-7 columns">
        <form className="input-group" onSubmit={this.onFormSubmit}>
          <input type="text" className="input-group-field"
            placeholder="Cari daerah pemilihan. contoh: kabupaten gowa"
            value={this.state.term}
            onChange={this.onInputChange}
            />
          <div className="input-group-button">
            <input type="submit" className="button" value="Cari" />
          </div>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchRegion,
    fetchInitialRegions,
    getRegionDetails
  }, dispatch);
}

function mapStateToProps({regionList}) {
  return { regionList };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);