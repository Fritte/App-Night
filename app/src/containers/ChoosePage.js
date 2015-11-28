import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';
import { pushState } from 'redux-router';

//import { fetchLogin } from '../actions';
import FormError from '../components/form/FormError';

import './ChoosePage.scss';

class ChoosePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="choosePage valign-wrapper">
        <div className="row valign">
          <div className="col s12">
            <h3 className="center-align">PoliTwit</h3>
            <h5 className="center-align">Choose your politicians twitter handle</h5>
          </div>
          <form className="col s8 offset-s2" 
                onSubmit={ () => null }>
            <div className="row">
              <div className="input-field col s12">
                <input id="handle" type="text" ref="handle"
                  className="validate" placeholder="" />
                <label htmlFor="handle" className="active">
                  Twitter Handle
                </label>
              </div>
              <div className="col s12 right-align">
                <button type="submit"
                  className="btn waves-effect waves-light">
                  Go!
                </button>
              </div>
              <div className="col s12 right-align">
                <FormError error={this.state.loginError} />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

ChoosePage.propTypes = {
  // react-redux
  // redux-router
  pushState: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
  };
}

var mapDispatchToProps = {
  pushState
};

export default connect(mapStateToProps, mapDispatchToProps)(ChoosePage);
