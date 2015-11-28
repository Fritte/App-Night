import fetch from 'isomorphic-fetch';


//const BASE = 'http://crowdtv.test.hyve.net';
//const BASE = 'http://10.131.0.154:3000';
//const BASE = 'http://crowdtv.my-ideanet.net';

//const BASE = 'http://localhost:3000';

// dev base (webpack-dev-server proxy, see gulpfile)
//const BASE = '';

export const API_BASE = 'http://localhost:3000';

function encodeParams(mapping) {
  return Object.keys(mapping).map( key => key + '=' + mapping[key] ).join('&');
}

export const LP_ENTITIES_REQUEST = 'LP_ENTITIES_REQUEST';
export const LP_ENTITIES_FAILURE = 'LP_ENTITIES_FAILURE';
export const LP_ENTITIES_SUCCESS = 'LP_ENTITIES_SUCCESS';

export function fetchLPEntities(twitterHandle) {

  return {
    // Types of actions to emit before and after
    types: [LP_ENTITIES_REQUEST, LP_ENTITIES_SUCCESS, LP_ENTITIES_FAILURE],
    // Check the cache (optional):
    shouldCallAPI: (state) => true,//!state.users[userId],
    // Perform the fetching:
    callAPI: () => fetch(API_BASE+'/'+twitterHandle, {
    }),
    // Arguments to inject in begin/end actions
    payload: { }
  };
}


export const SELECT_TWITTER_HANDLE = 'SELECT_TWITTER_HANDLE';

export function selectTwitterHandle(twitterHandle) {
  return {
    type: SELECT_TWITTER_HANDLE,
    twitterHandle
  };
}
