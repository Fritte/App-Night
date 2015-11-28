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

    const handle = props.routeParams.handle;
    console.log('CANDIDATE PAGE CONSTR');

    props.selectTwitterHandle(handle);
    props.fetchLPEntities(handle);
    props.fetchTweets(handle);

    this.state = {
    };
  }

  render() {

    return (
      <div className="candidatePage">
        <h5> CandidatePage </h5>
        <div className="container"> 
          <div className="row">
            <div className="col s8">
              <Tweets tweets={this.props.twitter.tweets} />
            </div>
            <div className="col s4">
              <Entities entities={this.props.twitter.entities} />
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
