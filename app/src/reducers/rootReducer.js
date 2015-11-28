import * as ActionTypes from '../actions';
import { routerStateReducer as router } from 'redux-router';
import { combineReducers } from 'redux';

function arrayToMapById(a) {
  var r = {};
  a.forEach( (v) => r[v.id] = v );
  return r;
}

function mergeNew(source, target) {
  source = arrayToMapById(source);
  target = arrayToMapById(target);
  let merge = Object.assign({}, source, target);
  var ret =  Object.keys(merge).map( k => merge[k] );
  return ret;
}



var twitterState = {
  twitterHandle: '',
  entities: null,
  entitiesRequest: false,
  entitiesError: false,
  tweets: null,
  tweetsRequest: false,
  tweetsError: false
};

function twitter(state = twitterState, action) {
  switch (action.type) {
    case ActionTypes.SELECT_TWITTER_HANDLE: 
      return {
        ...state, 
        twitterHandle: action.twitterHandle
      };
    case ActionTypes.LP_ENTITIES_REQUEST:
      return {
        ...state,
        entitiesRequest: true,
        entitiesError: false
      };
    case ActionTypes.LP_ENTITIES_FAILURE: 
      return {
        ...state,
        entitiesRequest: false,
        entitiesError: true
      };
    case ActionTypes.LP_ENTITIES_SUCCESS: 
      return {
        ...state,
        entitiesRequest: false,
        entitiesError: false,
        entities: action.response
      };
    case ActionTypes.TWEETS_REQUEST:
      return {
        ...state,
        tweetsRequest: true,
        tweetsError: false
      };
    case ActionTypes.TWEETS_FAILURE: 
      return {
        ...state,
        tweetsRequest: false,
        tweetsError: true
      };
    case ActionTypes.TWEETS_SUCCESS: 
      return {
        ...state,
        tweetsRequest: false,
        tweetsError: false,
        tweets: action.response
      };
    default: 
      return state;
  }
}
            

const rootReducer = combineReducers({
  twitter,
  router
});

export default rootReducer;
