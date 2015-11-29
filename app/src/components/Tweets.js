import React, { Component, PropTypes } from 'react';

import './Tweets.scss';

export default class Tabs extends Component {
  constructor(props) {
    super(props);

    this.handleSortChange = this.handleSortChange.bind(this);

    this.state = {
      sortOrder: 'date_desc'
    }; 
  }

  handleSortChange(e) {
    this.setState({ sortOrder: e.target.value });
  }

  render() {
    var tweets = [];
    var tweetsRender = '';
    var selectedTag = '';

    if (this.props.selectedEntity) 
      selectedTag = this.props.selectedEntity.text;

    if (this.props.tweets) {
      if(!selectedTag){
        tweets = this.props.tweets.slice(0, 50);
      } else {
        tweets = this.props.tweets.filter( (t) => t.text.includes(selectedTag)).slice(0, 50); 
      }

      switch (this.state.sortOrder) {
        case 'retweets_desc':
          tweets = tweets.sort( 
              (a, b) => a.retweet_count < b.retweet_count ? 1 : ( a.retweet_count > b.retweet_count ? -1 : 0 ) 
          );
          break;
        case 'favorites_desc':
          tweets = tweets.sort( 
              (a, b) => a.favorite_count < b.favorite_count ? 1 : ( a.favorite_count > b.favorite_count ? -1 : 0 ) 
          );
          break;
        case 'date_desc':
        default:
          break;
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
        <div className="input-field sortField">
          <label>Sort order</label>
          <select onChange={this.handleSortChange} value={this.state.sortOrder}>
            <option value="date_desc">Most recent</option>
            <option value="retweets_desc">Most retweets</option>
            <option value="favorites_desc">Most favorites</option>
          </select>
        </div>
        {tweetsRender}
      </div>
    );
  }
}
