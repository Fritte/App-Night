import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { SERVER_BASE } from '../actions';
//import ReactMixin from 'react-mixin';
//import ReactRenderVisualizer from 'react-render-visualizer';
//import PureRenderMixin from 'react-addons-pure-render-mixin';

import './VideoItemPage.scss';

class VideoItemPage extends Component {

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    //console.log('videoItemPage::shouldCompUpdate => shouldUpdate : %s', nextProps.shouldUpdate);
    //return false;
    //return nextProps.shouldUpdate;
    return nextProps.transEnd && nextProps.shouldUpdate;
  }

  render() {
    const v = this.props.video;
    console.log('VIDEOITEMPAGE::RENDER');
    return (
      <div className="row videoItem">
        <div className="videoWrapper">
          { /*<video controls 
             className="responsive-video" style={{display: 'block'}} >
            <source src={SERVER_BASE + v.url} type="video/mp4" />
          </video> */ }
        </div>
        <div className="imgwrapper">
          <img className="responsive-img" src={SERVER_BASE + v.thumb} />
        </div>
        <div className="col s12 z-depth-1" style={{marginTop: 0}}>
          <h5 className="title">{v.title}</h5>
          <span>by {v.author.firstname + ' ' + v.author.lastname}</span>
          <p className="descriptionTitle"><b>Description</b></p>
          <p>{v.description}</p>
        </div>
      </div>
    );
  }
}

VideoItemPage.PropTypes = {
  shouldUpdate: PropTypes.bool.isRequired,
  video: PropTypes.object.isRequired
};

//ReactMixin.onClass(VideoItemPage, PureRenderMixin);
//ReactMixin.onClass(VideoItemPage, ReactRenderVisualizer);
//ReactMixin(VideoItemPage.prototype, ReactRenderVisualizer);

function mapStateToProps(state, ownProps) {
  const videoId = state.router.params.id;
  const videos = state.video.videos;

  const videoArrId = videos.findIndex( v => v.id == videoId );
  const video = videoArrId > -1 ? videos[videoArrId] : {};

  return {
    video  
  };
}

export default connect(mapStateToProps)(VideoItemPage);
