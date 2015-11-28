import React, { Component, PropTypes} from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
//import DevTools from './DevTools.js';

//import Routes from '../routes.js';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

import GenericComponentWrapper from '../components/GenericComponentWrapper';
import App from './App.js';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import HomePage from './HomePage';
import VideoPage from './VideoPage';
import VideoItemPage from './VideoItemPage';
import UploadPage from './UploadPage';
import ProfilePage from './ProfilePage';
import ProfileEditPage from './ProfileEditPage';
import ProfileEditUserPage from './ProfileEditUserPage';
import ProfileEditPasswordPage from './ProfileEditPasswordPage';
import ProfileEditImagePage from './ProfileEditImagePage';


export default class Root extends Component {

  constructor(props) {
    super(props);
    this.requireAuth = this.requireAuth.bind(this);
  }

  requireAuth(nextState, replaceState) {
    const auth = this.props.store.getState().auth;
    if (!auth.bearerToken) { 
      replaceState({ nextPathname: nextState.location.pathname }, '/'); 
      console.error('Not authenticated!');
    }
  }

  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
          <ReduxRouter>

            <Route path="/" component={App}>
              <IndexRoute component={LoginPage} />
              <Route path="register" component={RegisterPage} />
              <Route path="home" component={HomePage}
                      onEnter={this.requireAuth}>

                <Route path="video" component={GenericComponentWrapper}>
                  <Route path=":id" component={VideoItemPage} />
                  <IndexRoute component={VideoPage} />
                </Route>

                <Route path="upload" component={GenericComponentWrapper}>
                  <IndexRoute component={UploadPage} />
                </Route>

                <Route path="profile" component={GenericComponentWrapper}>
                  <Route path="edit" component={ProfileEditPage}>
                    <Route path="password" component={ProfileEditPasswordPage} />
                    <Route path="image" component={ProfileEditImagePage} />
                    <Route path="user" component={ProfileEditUserPage} />
                    <IndexRedirect to="/home/profile/edit/user" />
                  </Route>
                  <IndexRoute component={ProfilePage} />
                </Route>

                <IndexRedirect to="/home/video" />

              </Route>
            </Route>

          </ReduxRouter>
          {/*<DevTools />*/}
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};

//<Route path="/" component={App} />
