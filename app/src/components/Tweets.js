import React, { Component, PropTypes } from 'react';

import './Tweets.scss';

export default class Tabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }; 
  }

  render() {
    var tweets = [];
    var tweetsRender = '';
    var selectedTag = '';

    if (this.props.selectedEntity) 
      selectedTag = this.props.selectedEntity.text;

    if (this.props.tweets) {
      if(!selectedTag){
        tweets = this.props.tweets.slice(0, 20);
      } else {
        tweets = this.props.tweets.filter( (t) => t.text.includes(selectedTag)).slice(0, 20); 
      }

      tweetsRender = tweets.map( (t) => {

        var text = <div>{t.text}</div>; 
        if (selectedTag) {
          text = (
            <div>
              {t.text.slice(0, t.text.indexOf(selectedTag))} 
              <div className="blue-text text-darken-2" style= {{display: 'inline'}}> <strong> { selectedTag } </strong> </div>
              {t.text.slice(t.text.indexOf(selectedTag) + selectedTag.length )}
            </div>
          );
        }

        return (      
          <div key={t.id} className="tweet card-panel grey lighten-5 z-depth-3"> 
            <div className="valign-wrapper">
              <div className="">
                <div className="black-text">
                  {text}
                 <div className="scores">
                  <span><i className="material-icons">favorite</i>{t.favorite_count}</span>
                  <span><i className="material-icons">cached</i>{t.retweet_count}</span>
                 </div>
               </div>
              </div>
            </div>
          </div>
        );
      });
    
    }

    return (
      <div className="tweetsComp">
        <h5>Tweets</h5>
        {tweetsRender}
      </div>
    );
  }
}
