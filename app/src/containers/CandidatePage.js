import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';
import { pushState } from 'redux-router';

import { selectTwitterHandle, fetchLPEntities, fetchTweets } from '../actions';
//import FormError from '../components/form/FormError';

// Change to CandidatePage.scss!
import './CandidatePage.scss';


import Tweets from '../components/Tweets';
import Entities from '../components/Entities';

class CandidatePage extends Component {
  constructor(props) {
    super(props);

    this.fetchStuff = this.fetchStuff.bind(this);
    this.handleEntityChange = this.handleEntityChange.bind(this);

    const handle = props.routeParams.handle;
    this.fetchStuff(props, handle);

    this.state = {
      selectedEntity: null
    };
  }

  fetchStuff(props, handle) {
    props.selectTwitterHandle(handle);
    props.fetchLPEntities(handle);
    props.fetchTweets(handle);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.routeParams.handle && nextProps.routeParams.handle !== this.props.routeParams.handle) {
      this.fetchStuff(this.props, nextProps.routeParams.handle);
    }
  }

  handleEntityChange(entity) {
    this.setState({selectedEntity: entity});
  }

  render() {

    return (
      <div className="candidatePage">
        <h5> CandidatePage </h5>
        <div className="container"> 
          <div className="row">
            <div className="col s8 tweetsCompWrapper">
              <Tweets tweets={this.props.twitter.tweets} 
                selectedEntity={this.state.selectedEntity} 
              />
            </div>
            <div className="col s4 entitiesCompWrapper">
              <Entities entities={this.props.twitter.entities} 
                setEntity={this.handleEntityChange} 
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CandidatePage.propTypes = {
  // react-redux
  // redux-router
  twitter: PropTypes.object.isRequired,
  selectTwitterHandle: PropTypes.func.isRequired,
  fetchLPEntities: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    twitter: state.twitter
  };
}

var mapDispatchToProps = {
  selectTwitterHandle, 
  fetchLPEntities, 
  fetchTweets
};

export default connect(mapStateToProps, mapDispatchToProps)(CandidatePage);
