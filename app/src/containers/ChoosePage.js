import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';
import { pushState } from 'redux-router';

//import { selectTwitterHandle } from '../actions';
import { Form } from 'formsy-react';
import Input from '../components/form/Input';
import FormError from '../components/form/FormError';

import './ChoosePage.scss';

class ChoosePage extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
    };
  }

  handleSubmit(model, resetForm, invalidateForm) {
    const handle = model.handle;
    console.log('model', model, handle);
    this.props.pushState(null, '/candidate/'+handle);
  }

  render() {
    return (
      <div className="choosePage valign-wrapper">
        <div className="row valign">
          <div className="col s12">
            <h3 className="center-align">PoliTwit</h3>
            <h5 className="center-align">Choose your politicians twitter handle</h5>
          </div>
          <Form className="col s8 offset-s2" 
                onValidSubmit={ this.handleSubmit }>
            <Input name="handle" type="text" className="col s12"
                label="Twitter Handle" placeholder="trump" 
                validations="minLength:2" 
                validationErrors={{ 
                  minLength: 'Minimum 2 characters' 
                }} 
                required /> 
            <div className="row">
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
          </Form>
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
