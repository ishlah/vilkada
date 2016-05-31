import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
  fetchRegion,
  fetchInitialRegions
} from '../actions/index';

class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = { term: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchInitialRegions();
  }

  onFormSubmit(event) {
    event.preventDefault();

    const nameIds = this.props.regionList.nameIds;
    let searchTerm = '',
        regionId = null,
        regId = null;

    // fetch region name and region id
    // 1. find if the term has 'kabupaten' on it
    // 2. convert 'kabupaten into kab.'
    searchTerm = this.state.term.replace(/kabupaten/i, 'kab.');

    // 3. based on this new term, find region id in the 'regionList'
    regionId = _.findIndex(nameIds, {nama: searchTerm.toUpperCase()});
    regId = nameIds[regionId].id;

    console.log(regId);


    // 4. dispatch 'getRegionDetails' action creator

    // fetch location
    this.props.fetchRegion(this.state.term);
    this.setState({ term: '' });
  }

  onInputChange(event) {
    this.setState({ term : event.target.value });
  }

  render() {
    return (
      <div className="row small-11 medium-8 large-7 columns">
        <form className="input-group" onSubmit={this.onFormSubmit}>
          <input type="text" className="input-group-field"
            placeholder="Cari daerah pemilihan ..."
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
    fetchInitialRegions
  }, dispatch);
}

function mapStateToProps({regionList}) {
  return { regionList };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);