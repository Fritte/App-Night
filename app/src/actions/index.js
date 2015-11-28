import fetch from 'isomorphic-fetch';


//const BASE = 'http://crowdtv.test.hyve.net';
//const BASE = 'http://10.131.0.154:3000';
const BASE = 'http://crowdtv.my-ideanet.net';

// dev base (webpack-dev-server proxy, see gulpfile)
//const BASE = '';

export const API_BASE = BASE + '/api';
export const SERVER_BASE = BASE;

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

function encodeParams(mapping) {
  return Object.keys(mapping).map( key => key + '=' + mapping[key] ).join('&');
}


export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export function fetchLogin(email, pwd) {

  const loginData = encodeParams({'email': email, 'password': pwd});

  return {
    // Types of actions to emit before and after
    types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
    // Check the cache (optional):
    shouldCallAPI: (state) => true,//!state.users[userId],
    // Perform the fetching:
    callAPI: (token) => fetch(API_BASE+'/login', {
      method: 'post',
      body: loginData
    }),
    // Arguments to inject in begin/end actions
    payload: { }
  };
}
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export function fetchLogout() {
  return {
    // Types of actions to emit before and after
    types: [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE],
    // Check the cache (optional):
    shouldCallAPI: (state) => true,//!state.users[userId],
    // Perform the fetching:
    callAPI: (token) => fetch(API_BASE+'/logout', {
      method: 'post',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }),
    // Arguments to inject in begin/end actions
    payload: { }
  };
}

export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILURE = 'USER_FAILURE';

export function fetchUser() {
  return {
    // Types of actions to emit before and after
    types: [USER_REQUEST, USER_SUCCESS, USER_FAILURE],
    // Check the cache (optional):
    shouldCallAPI: (state) => true,//!state.users[userId],
    // Perform the fetching:
    callAPI: (token) => fetch(API_BASE+'/users/self', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }),
    // Arguments to inject in begin/end actions
    payload: { }
  };
}

export const VIDEOS_REQUEST = 'VIDEOS_REQUEST';
export const VIDEOS_SUCCESS = 'VIDEOS_SUCCESS';
export const VIDEOS_FAILURE = 'VIDEOS_FAILURE';

export function fetchVideos(category = null, query = '', limit = 25, page = 1) {
  
  let oParams = {
    search: query,
    amount: limit,
    page
  };
  if (category) oParams.category = category;
  const sParams = '?'+encodeParams(oParams);

  return {
    // Types of actions to emit before and after
    types: [VIDEOS_REQUEST, VIDEOS_SUCCESS, VIDEOS_FAILURE],
    // Check the cache (optional):
    shouldCallAPI: (state) => true,//!state.users[userId],
    // Perform the fetching:
    callAPI: (token) => fetch(API_BASE+'/videos'+sParams, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }),
    // Arguments to inject in begin/end actions
    payload: { }
  };
}

export const VIDEOS_SELF_REQUEST = 'VIDEOS_SELF_REQUEST';
export const VIDEOS_SELF_SUCCESS = 'VIDEOS_SELF_SUCCESS';
export const VIDEOS_SELF_FAILURE = 'VIDEOS_SELF_FAILURE';

export function fetchVideosSelf(category = null, query = '', limit = 25, page = 1) {
  
  let oParams = {
    search: query,
    amount: limit,
    page
  };
  if (category) oParams.category = category;
  const sParams = '?'+encodeParams(oParams);

  return {
    // Types of actions to emit before and after
    types: [VIDEOS_SELF_REQUEST, VIDEOS_SELF_SUCCESS, VIDEOS_SELF_FAILURE],
    // Check the cache (optional):
    shouldCallAPI: (state) => true,//!state.users[userId],
    // Perform the fetching:
    callAPI: (token) => fetch(API_BASE+'/videos/self'+sParams, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }),
    // Arguments to inject in begin/end actions
    payload: { }
  };
}

export const VIDEO_UPLOAD_REQUEST = 'VIDEO_UPLOAD_REQUEST';
export const VIDEO_UPLOAD_SUCCESS = 'VIDEO_UPLOAD_SUCCESS';
export const VIDEO_UPLOAD_FAILURE = 'VIDEO_UPLOAD_FAILURE';

export function uploadVideo(videoFormData) {
  return {
    // Types of actions to emit before and after
    types: [VIDEO_UPLOAD_REQUEST, VIDEO_UPLOAD_SUCCESS, VIDEO_UPLOAD_FAILURE],
    // Check the cache (optional):
    shouldCallAPI: (state) => true,//!state.users[userId],
    // Perform the fetching:
    callAPI: (token) => fetch(API_BASE+'/videos', {
      method: 'post',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      body: videoFormData
    }),
    // Arguments to inject in begin/end actions
    payload: { }
  };
}

export const USER_EDIT_REQUEST = 'USER_EDIT_REQUEST';
export const USER_EDIT_SUCCESS = 'USER_EDIT_SUCCESS';
export const USER_EDIT_FAILURE = 'USER_EDIT_FAILURE';

export function editUser(userFormData) {

  // Http method overwrite (larafk)
  userFormData.append('_method', 'PUT');

  return {
    // Types of actions to emit before and after
    types: [USER_EDIT_REQUEST, USER_EDIT_SUCCESS, USER_EDIT_FAILURE],
    // Check the cache (optional):
    shouldCallAPI: (state) => true,//!state.users[userId],
    // Perform the fetching:
    callAPI: (token) => fetch(API_BASE+'/users/self', {
      method: 'post',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      body: userFormData
    }),
    // Arguments to inject in begin/end actions
    payload: { }
  };
}

export const USER_EDIT_PASSWORD_REQUEST = 'USER_EDIT_PASSWORD_REQUEST';
export const USER_EDIT_PASSWORD_SUCCESS = 'USER_EDIT_PASSWORD_SUCCESS';
export const USER_EDIT_PASSWORD_FAILURE = 'USER_EDIT_PASSWORD_FAILURE';

export function editUserPassword(userPasswordFormData) {

  // Http method overwrite (larafk)
  userPasswordFormData.append('_method', 'PUT');

  return {
    // Types of actions to emit before and after
    types: [USER_EDIT_PASSWORD_REQUEST, USER_EDIT_PASSWORD_SUCCESS, USER_EDIT_PASSWORD_FAILURE],
    // Check the cache (optional):
    shouldCallAPI: (state) => true,//!state.users[userId],
    // Perform the fetching:
    callAPI: (token) => fetch(API_BASE+'/users/self/password', {
      method: 'post',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      body: userPasswordFormData
    }),
    // Arguments to inject in begin/end actions
    payload: { }
  };
}

export const USER_EDIT_IMAGE_REQUEST = 'USER_EDIT_IMAGE_REQUEST';
export const USER_EDIT_IMAGE_SUCCESS = 'USER_EDIT_IMAGE_SUCCESS';
export const USER_EDIT_IMAGE_FAILURE = 'USER_EDIT_IMAGE_FAILURE';

export function editUserImage(userImageFormData) {

  // Http method overwrite (larafk)
  userImageFormData.append('_method', 'PUT');

  return {
    // Types of actions to emit before and after
    types: [USER_EDIT_IMAGE_REQUEST, USER_EDIT_IMAGE_SUCCESS, USER_EDIT_IMAGE_FAILURE],
    // Check the cache (optional):
    shouldCallAPI: (state) => true,//!state.users[userId],
    // Perform the fetching:
    callAPI: (token) => fetch(API_BASE+'/users/self/image', {
      method: 'post',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      body: userImageFormData
    }),
    // Arguments to inject in begin/end actions
    payload: { }
  };
}

export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE';

export function registerUser(userFormData) {
  return {
    // Types of actions to emit before and after
    types: [USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAILURE],
    // Check the cache (optional):
    shouldCallAPI: (state) => true,//!state.users[userId],
    // Perform the fetching:
    callAPI: () => fetch(API_BASE+'/users', {
      method: 'post',
      body: userFormData
    }),
    // Arguments to inject in begin/end actions
    payload: { }
  };
}

