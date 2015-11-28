import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';
import { pushState } from 'redux-router';

import { selectTwitterHandle, fetchLPEntities } from '../actions';
//import FormError from '../components/form/FormError';

// Change to CandidatePage.scss!
import './ChoosePage.scss';

class CandidatePage extends Component {
  constructor(props) {
    super(props);

    const handle = props.routeParams.handle;

    props.selectTwitterHandle(handle);
    props.fetchLPEntities(handle);

    this.state = {
    };
  }

  render() {
    return (
      <div className="candidatePage">
        <h5> Im ze candidatePage </h5>
        <pre style={{maxHeight: '300px'}}>{JSON.stringify(this.props.twitter.entities, null, 2)}</pre>
        <div className="">
          {this.props.children}
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
  fetchLPEntities
};

export default connect(mapStateToProps, mapDispatchToProps)(CandidatePage);
