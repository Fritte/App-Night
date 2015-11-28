import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';
import classNames from 'classnames';
//import ReactMixin from 'react-mixin';
//import PureRenderMixin from 'react-addons-pure-render-mixin';
import RouteTransitionMotion from '../components/RouteTransitionMotion';

import { pushState } from 'redux-router';
import { fetchLogout, fetchUser } from '../actions';

import './HomePage.scss';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSideNavOpen = this.handleSideNavOpen.bind(this);
    this.handleSideNavClose = this.handleSideNavClose.bind(this);
    this.handleFocusNav = this.handleFocusNav.bind(this);
    this.handleBlurNav = this.handleBlurNav.bind(this);
    this.handleScrollTop = this.handleScrollTop.bind(this);
    this.handleGoRouterUp = this.handleGoRouterUp.bind(this);
    this.isSibling = this.isSibling.bind(this);
    this.getPageTitle = this.getPageTitle.bind(this);

    this.state = {
      sideNav: {
        open: false
      }
    };
  }

  componentWillMount() {
    if (!this.props.user.hasFetched)
      this.props.fetchUser(this.props.auth.bearerToken);
  }

  handleFocusNav() {
    //this.refs.nav.style.webkitTransform = 'translateY(-'+window.scrollY+'px)';
  }
  handleBlurNav() {
    //this.refs.nav.style.webkitTransform = '';
  }

  componentDidMount() {
    if (/iPad|iPhone|iPod/.test(navigator.platform)) {
      document.addEventListener('focus', this.handleFocusNav, true);
      document.addEventListener('blur', this.handleBlurNav, true);
    }
  }

  componentWillUnmount() {
    if (/iPad|iPhone|iPod/.test(navigator.platform)) {
      document.removeEventListener('focus', this.handleFocusNav, true);
      document.removeEventListener('blur', this.handleBlurNav, true);
    }
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.fetchLogout(this.props.auth.bearerToken)
      .then( () => { this.props.pushState(null, '/'); } );
  }

  handleSideNavOpen(e) {
    e.preventDefault();
    this.setState({
      ...this.state, 
      sideNav: { 
        open: true
      } 
    });
  }
  handleSideNavClose(e) {
    //e.preventDefault(); // prevents link route transitions!
    this.setState({
      ...this.state, 
      sideNav: { 
        open: false
      } 
    });
  }

  handleScrollTop() {
    window.scroll(window.scrollX, window.scrollY);
  }

  handleGoRouterUp(e) {
    e.preventDefault();
    const rLvl3Path = this.props.routes[3].path;
    const path = rLvl3Path.replace(/\/.*/, '');
    this.props.pushState(null, '/home/' + path);
  }

  isSibling() {
    if (this.props.routes[4] && this.props.routes[4].path) {
      return false;
    }
    
    const rLvl3Path = this.props.routes[3].path;

    const sibling = (/^video$/).test(rLvl3Path) ||
      (/^upload$/).test(rLvl3Path) ||
      (/^profile$/).test(rLvl3Path);
  
    return sibling;
  }

  getPageTitle() {
    const rLvl3Path = this.props.routes[3].path;

    if ((/^video/).test(rLvl3Path)) {
      return 'Videos';
    } else if ((/^upload/).test(rLvl3Path)) {
      return 'Upload';
    } else if ((/^profile/).test(rLvl3Path)) {
      return 'Profil';
    } else {
      return 'Crowd TV';
    }
  }
  


  handleIconClick(e) {
    console.log(this);
    const sibling = this.isSibling();
    if (sibling) {
      return this.handleSideNavOpen(e);
    } else {
      return this.handleGoRouterUp(e);
    }
  }

  render() {
    const { user } = this.props;
    const firstname = user.profile ? user.profile.firstname : '';

    const slideNavClass = classNames({
      'slide-container': true,
      'open': this.state.sideNav.open
    });
    const slideBgClass = classNames({
      'slide-background': true,
      'open': this.state.sideNav.open
    });

    let icon = 'menu';
    if (!this.isSibling()) {
      icon = 'arrow_back';
    }

    const pageTitle = this.getPageTitle();

    console.log('HOMEPAGE::RENDER');

    return (
      <div className="homePage">
        <header>
            <nav ref="nav">
              <div className="nav-wrapper">
                <a className="brand-logo">{pageTitle}</a>
                <a className="button-collapse" onClick={(e) => this.handleIconClick(e)}>
                  <i className="material-icons">{icon}</i>
                </a>
                <ul id="nav-mobile" className="right">
                  <li>
                    <a href="/" onClick={this.handleLogout}>
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
        </header>
        <div id="slide-background" className={slideBgClass} onClick={this.handleSideNavClose}></div>
        <div className={slideNavClass}>
          <ul id="slide-out" className="side-nav">
            <li>
              <IndexLink to="/home" 
                   onClick={this.handleSideNavClose}>
                Videos
              </IndexLink>
            </li>
            <li>
              <Link to="/home/upload"
                   onClick={this.handleSideNavClose}>
                Upload
              </Link>
            </li>
            <li>
              <Link to="/home/profile"
                   onClick={this.handleSideNavClose}>
                Profile
              </Link>
            </li>
          </ul>
        </div>
        <div className="home-children">
          <RouteTransitionMotion>
            {this.props.children}
          </RouteTransitionMotion>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  // react-redux
  fetchLogout: PropTypes.func.isRequired,
  pushState: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

//ReactMixin.onClass(HomePage, PureRenderMixin);

function mapStateToProps(state) {
  return {
    auth: state.auth,
    user: state.user
  };
}
var mapDispatchToProps = {
  fetchLogout,
  fetchUser,
  pushState
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
