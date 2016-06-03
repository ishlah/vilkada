import Autosuggest from 'react-autosuggest';
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchInitialRegions,
  getRegionDetails
} from '../actions/index';
 
class SearchSuggestion extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      value: '',
      suggestions: this.getSuggestions('')
    };
 
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.getRegionId = this.getRegionId.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
  }

  componentDidMount() {
    this.props.fetchInitialRegions();
  }

  onFormSubmit(event) {
    event.preventDefault();

    //  1 - 3 get regionId
    let region = this.state.value,
        regionId = this.getRegionId();

    // 4. dispatch 'getRegionDetails' action creator
    this.props.getRegionDetails(region, regionId);
    // this.props.fetchRegion(region);

    // remove the term from the search field
    // this.setState({
    //   value: '',
    //   suggestions: this.getSuggestions('')
    // });
  }

  getRegionId() {
    const nameIds = this.props.regionList.nameIds;
    let searchTerm = '',
        regionId = null;

    // fetch region name and region id
    // 1. find if the term has 'kabupaten' on it
    // 2. convert 'kabupaten into kab.'
    searchTerm = this.state.value.replace(/kabupaten/i, 'kab.');

    // 3. based on this new term, find region id in the 'regionList'
    regionId = _.findIndex(nameIds, {nama: searchTerm.toUpperCase()});
    
    return nameIds[regionId].id;
  }

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const pattern = new RegExp(inputValue, 'i');

    return inputLength === 0 ? [] : this.props.regionList.names.filter(region =>
      pattern.test(region)
    );
  }
   
  getSuggestionValue(suggestion) {
    return suggestion;
  }
   
  renderSuggestion(suggestion) {
    return (
      <span>{suggestion}</span>
    );
  }
 
  onChange(event, { newValue }) {
    this.setState({
      value: newValue
    });
  }
 
  onSuggestionsUpdateRequested({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Type a region',
      value,
      onChange: this.onChange
    };

    return (
      <div className="row small-11 medium-8 large-7 columns">
        <form className="input-group" onSubmit={this.onFormSubmit}>
          <Autosuggest suggestions={suggestions}
            onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
            className="input-group-field"
            />
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchInitialRegions,
    getRegionDetails
  }, dispatch);
}

function mapStateToProps({regionList}) {
  return { regionList };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchSuggestion);