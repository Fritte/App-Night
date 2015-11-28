import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';
import { pushState } from 'redux-router';

//import { fetchLogin } from '../actions';
//import FormError from '../components/form/FormError';

import './ChoosePage.scss';

class KeywordsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="keywordsPage">
        <h5> Im ze keywordsPage, honey! </h5>
      </div>
    );
  }
}

KeywordsPage.propTypes = {
  // react-redux
  // redux-router
};

function mapStateToProps(state) {
  return {
    twitter: state.twitter
  };
}

var mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(KeywordsPage);
