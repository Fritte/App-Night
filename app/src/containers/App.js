import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

import Tabs from '../components/Tabs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      tabs: [
        {
          label: '@HillaryClinton',
          path: '/candidate/HillaryClinton'
        },
        {
          label: '@realDonaldTrump',
          path: '/candidate/realDonaldTrump'
        }
      ]
    };

    this.onAddClick = this.onAddClick.bind(this);
    this.addTab = this.addTab.bind(this);
    this.handleModalAbort = this.handleModalAbort.bind(this);
    this.handleModalAdd = this.handleModalAdd.bind(this);
  }

  addTab(twitterHandle) {
    //get twitter name @todo
    this.setState({
      tabs: [ 
        ...this.state.tabs, 
        { label: twitterHandle, path: '/candidate/' + twitterHandle.substr(1) }
      ] 
    });
  }

  onAddClick(){
    console.log('Like Button Clicked');
    this.setState({modalOpen: true});
  }

  handleModalAbort(e) {
    this.refs.twitterHandleInput.value = '';
    this.setState({modalOpen: false});
  }

  handleModalAdd(e) {
    e.preventDefault();
    const twitterHandle = this.refs.twitterHandleInput.value.trim();
    this.addTab(twitterHandle);
    this.refs.twitterHandleInput.value = '';
    this.setState({modalOpen: false});
  }

  render() {
    const { children } = this.props;
    const { modalOpen } = this.state;

    const overlayStyle = !modalOpen ? {} : {
      display: 'block',
      opacity: 0.5
    };
    const modalStyle = !modalOpen ? {} : {
      display: 'block',
      top: '30%',
      //transform: 'translateY(-50%)',
      zIndex: 1005
    };

    return (
      <div className="appPage">
        <div className="appContainer">
          <nav>
            <div className="top-nav">
              <div className="container">
                <div className="nav-wrapper">
                  <a href="#" className="brand-logo">PoliTweet</a>
                </div>
              </div>
            </div>
          </nav>
          <Tabs tabs={this.state.tabs}/>
          <div>
            {children}
          </div>
        </div>
        <div className="modalWrapper">
          <div className="lean-overlay" style={overlayStyle}></div>
          <div className="modal" style={modalStyle}>
            <div className="modal-content">
              <h4>Add a Politican</h4>
              <p>Enter a Twitter name to add his feed to the list.</p>
              <form onSubmit={this.handleModalAdd}>
                <input type="text" ref="twitterHandleInput" placeholder="@realDonaldTrump" />
              </form>
            </div>
            <div className="modal-footer">
              <a className="modal-action modal-close btn-flat" onClick={this.handleModalAbort}>Abort</a>
              <a className="modal-action modal-close btn-flat" onClick={this.handleModalAdd}>Ok</a>
            </div>
          </div>
        </div>
        <div className="fixed-action-btn" style={{ 'bottom': '45px', 'right': '24px' }}>
          <a className="btn-floating btn-large red">
            <i className="large material-icons" onClick={ this.onAddClick }>add</i>
          </a>
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
