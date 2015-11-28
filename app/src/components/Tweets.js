import React, { Component, PropTypes } from 'react';

export default class Tabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }; 
  }

  render() {
    var tweets = '';
    if (this.props.tweets) {
      tweets = this.props.tweets.map( (t) => (
      <div className="card-panel grey lighten-5 z-depth-1"> 
        <div className="row valign-wrapper">
          <div className="col s10">
            <span className="black-text">
              <div> {t.text} </div>
            </span>
          </div>
        </div>
      </div>
      )) ; 
    }

    return (
      <div className="col s12 m8 offset-m2 l6 offset-l3">
        {tweets}
      </div>
      );
  }
}
