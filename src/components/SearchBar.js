import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchRegion, fetchRegionList } from '../actions/index';

class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = { term: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchRegionList();
  }

  onFormSubmit(event) {
    event.preventDefault();

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
  return bindActionCreators({ fetchRegion, fetchRegionList }, dispatch);
}

function mapStateToProps({regionList}) {
  return { regionList };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);