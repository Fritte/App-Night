import React, { Component, PropTypes } from 'react';

export default class Tabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }; 
  }

  render() {
    var tweets = '';
    var selectedTag = 'Hillary';

    if (this.props.tweets) {
      if(!this.props.selectedTag){
        tweets = this.props.tweets.slice(0, 20);
      } else{
        tweets = this.props.tweets.filter( (t) => t.text.includes(this.props.selectedTag)).slice(0, 20);
      }
      tweets = tweets.map( (t) => (
      <div key={t.id} className="card-panel grey lighten-5 z-depth-3"> 
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
      <div className="">
        {tweets}
      </div>
      );
  }
}
