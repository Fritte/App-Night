import React, { Component, PropTypes } from 'react';
import {spring, TransitionMotion } from 'react-motion';
import StaticContainer from 'react-static-container';
import ReactMixin from 'react-mixin';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './RouteTransitionMotion.scss';

const sp = [90, 17]; //[210, 29];

const offsetXFwd = 100;
const offsetXBck = -30;

const aniLeavers = {};

export default class RouteTransitionMotion extends Component {
  constructor(props, context) {
    super(props, context);
    this.willEnter = this.willEnter.bind(this);
    this.willLeave = this.willLeave.bind(this);
    this.getStyles = this.getStyles.bind(this);

    this.state = {
      prevPathname: null,
      pathname: context.location.pathname,
      transCounter: 20,
      transition: 'DEFAULT',
      children: props.children
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    console.log('componentWillRecProps', nextProps.children.type.displayName);
    if (nextContext.location.pathname !== this.context.location.pathname) {
      this.setState({ 
        pathname: nextContext.location.pathname, 
        prevPathname: this.context.location.pathname, 
        transCounter: this.state.transCounter+1
      });
      if (nextProps.children.props.routes && this.props.children.props.routes) {

          const nextRoutes = nextProps.children.props.routes,
                currRoutes = this.props.children.props.routes;

        if ( nextRoutes.length > currRoutes.length ||
            (nextRoutes.length === currRoutes.length && nextRoutes[nextRoutes.length-1].path && !currRoutes[currRoutes.length-1].path) ) {
          this.setState({ transition: 'FORWARD' });
          console.log('transition forward');
        } else if ( nextRoutes.length < currRoutes.length || 
                   (nextRoutes.length === currRoutes.length && !nextRoutes[nextRoutes.length-1].path && currRoutes[currRoutes.length-1].path) ) {
          this.setState({ transition: 'BACKWARD' });
          console.log('transition backward');
        } else {
          this.setState({ transition: 'DEFAULT' });
          console.log('transition default');
        }
      } else {
        this.setState({ transition: 'DEFAULT' });
        console.log('transition dDefault');
      }
    }
  }

  componentDidUpdate() {
    if (this.state.prevPathname) {
     this.setState({prevPathname: null, children: this.props.children}); 
    }
  }

  willEnter(key, value) {
    switch (this.state.transition) {
      case 'FORWARD':
        return {
          handler: this.props.children,
          translate: spring(offsetXFwd, sp),
          delay: spring(0, sp),
          zIndex: this.state.transCounter
        };
      case 'BACKWARD':
        return {
          handler: this.props.children,
          translate: spring(offsetXBck, sp),
          delay: spring(0, sp),
          zIndex: value.zIndex
        };
      default:
        return {
          handler: this.props.children,
          translate: spring(offsetXFwd, sp),
          delay: spring(0, sp),
          zIndex: this.state.transCounter
        };
    }

  }

  willLeave(key, value, styles, currentInterpolatedStyle, currentSpeed) {
    if (aniLeavers[key]) 
      return aniLeavers[key];

    let leaver = {};

    switch (this.state.transition) {
      case 'FORWARD':
        leaver = {
          handler: value.handler,
          translate: spring(offsetXBck, sp),
          delay: spring(offsetXFwd, sp),
          zIndex: value.zIndex
        };
        break;
      case 'BACKWARD':
        leaver = {
          handler: value.handler,
          translate: spring(offsetXFwd, sp),
          delay: spring(0, sp),
          zIndex: value.zIndex
        };
        break;
      default:
        leaver = {
          handler: value.handler,
          translate: spring(offsetXFwd, sp),
          delay: spring(0, sp),
          zIndex: value.zIndex
        };
        break;
    }

    aniLeavers[key] = leaver;
    return leaver;
  }

  getStyles(prevStyles) {
    const { children } = this.props;
    const { pathname, transCounter } = this.state;

    let zIndex = this.state.transCounter;
    if (this.state.transition === 'BACKWARD') zIndex -= 2;

    let styles =  { 
      [transCounter]: {
        handler: children,
        translate: spring(0, sp),
        delay: spring(0, sp),
        zIndex: zIndex
      }
    };
    return styles;
  }

  render() {
    //var props; // temporary workaround (eslint - spread not defined) //babel-eslint fixes zis shit!
    var { children, ...props } = this.props;
    const { previousPathname } = this.state;

    const transitionName = 'page-transition-' + this.state.transition.toLowerCase();
    const transitionDuration = {
      'page-transition-forward': 400*1.5,
      'page-transition-backward': 400*1.5,
      'page-transition-default': 400*1.5
    };
    const tTimeout = transitionDuration[transitionName];
    
    return (
      <ReactCSSTransitionGroup transitionName={transitionName} transitionEnterTimeout={tTimeout} transitionLeaveTimeout={tTimeout}
        component="div" className="transitionPages"
      >
        <div className="transitionPage" key={this.state.prevPathname || this.context.location.pathname}>
          <div className="transitionContent">
            { 
              React.cloneElement(this.state.children, {shouldUpdate: !this.state.prevPathname, transEnd: true})
            }
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
    

    /*
    return (
      <TransitionMotion {...props}
        styles={this.getStyles}
        willEnter={this.willEnter}
        willLeave={this.willLeave}>
        { interpolatedStyles => { 
          const styleKeys = this.state.transition === 'BACKWARD' ? 
            Object.keys(interpolatedStyles).reverse() : Object.keys(interpolatedStyles);
          return (
          <div className="transitionPages">
            { Object.keys(interpolatedStyles).map( key =>
              <div
                className="transitionPage"
                key={`${key}-transition`}
                style={{
                  transform: `translate3d(${interpolatedStyles[key].translate}%, 0, 0)`,
                  WebkitTransform: `translate3d(${interpolatedStyles[key].translate}%, 0, 0)`,
                  zIndex: interpolatedStyles[key].zIndex
                }}
              >
                <div className="transitionContent">
                  {
                    React.cloneElement(interpolatedStyles[key].handler, {shouldUpdate: parseInt(key) == this.state.transCounter, 
                      transEnd: interpolatedStyles[key].translate === 0})
                  }
                </div>
              </div>
            ) }
          </div>
          );
          }
        }
      </TransitionMotion>
    );
    */
  }
}

RouteTransitionMotion.contextTypes = {
  location: React.PropTypes.object
};

ReactMixin.onClass(RouteTransitionMotion, PureRenderMixin);

/*function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(RouteTransitionMotion);
*/
//@TODO: pass route, routeparams through props, 
//such that StaticContainer freezes Props and 
//videopage gets correct videoid from routeparams.
//OR: implement freeze switch in didRecieveProps..
