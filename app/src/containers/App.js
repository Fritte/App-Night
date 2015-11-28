import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

import Tabs from '../components/Tabs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        {
          label: 'Hillarious Clinton',
          path: '/candidate/hillary'
        },
        {
          label: 'Donatious Trump',
          path: '/candidate/trump'
        }
      ]
    };
  }

  render() {
    const { children } = this.props;
    return (
      <div className="appContainer">
        <nav>
          <div className="top-nav">
            <div className="container">
              <div className="nav-wrapper">
                <a href="#" className="brand-logo">President Barometer</a>
              </div>
            </div>
          </div>
        </nav>
        <input type="text" name="twitterHandle" placeholder="twitter handle" />
        <button>Add</button>
        <Tabs tabs={this.state.tabs}/>
        <div>
          {children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  // by (react) redux
  pushState: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired
  // by react-router
  //children: PropTypes.node.isRequired
};

// Redux

function mapStateToProps(state) {
  return {
    inputValue: state.router.location.pathname.substring(1)
  };
}

var mapDispatchToProps = {
  pushState
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
