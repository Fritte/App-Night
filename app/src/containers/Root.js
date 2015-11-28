import React, { Component, PropTypes} from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
//import DevTools from './DevTools.js';

import { Route, IndexRoute, IndexRedirect } from 'react-router';

import GenericComponentWrapper from '../components/GenericComponentWrapper';
import App from './App.js';
import ChoosePage from './ChoosePage.js';
import CandidatePage from './CandidatePage.js';
import KeywordsPage from './KeywordsPage.js';
import OtherPage from './OtherPage.js';

export default class Root extends Component {

  constructor(props) {
    super(props);
    //this.requireAuth = this.requireAuth.bind(this);
  }

  /*
  requireAuth(nextState, replaceState) {
    const auth = this.props.store.getState().auth;
    if (!auth.bearerToken) { 
      replaceState({ nextPathname: nextState.location.pathname }, '/'); 
      console.error('Not authenticated!');
    }
  }
  */

  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
          <ReduxRouter>

            <Route path="/" component={App}>
              <IndexRoute component={ChoosePage} />
              <Route path="candidate/:handle" component={CandidatePage}>
                <Route path="keywords" component={KeywordsPage} />
                <Route path="other" component={OtherPage} />
                <IndexRedirect to="keywords" />
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
