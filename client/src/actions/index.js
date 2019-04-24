import axios from 'axios';
import { 
  AUTH_SIGN_UP, 
  AUTH_SIGN_OUT, 
  AUTH_SIGN_IN,
  AUTH_LINK_GOOGLE, 
  AUTH_LINK_FACEBOOK,
  AUTH_UNLINK_GOOGLE,
  AUTH_UNLINK_FACEBOOK, 
  AUTH_ERROR,
  DASHBOARD_GET_DATA } from './types';

export const oauthGoogle = data => {
  return async dispatch => {
    const res = await axios.post('http://localhost:5000/users/oauth/google', {
      access_token: data
    });

    dispatch({
      type: AUTH_SIGN_UP,
      payload: res.data
    });

    localStorage.setItem('JWT_TOKEN', res.data.token);
    axios.defaults.headers.common['Authorization'] = res.data.token;
  };
}

export const linkGoogle = data => {
  return async dispatch => {
    const res = await axios.post('http://localhost:5000/users/oauth/link/google', {
      access_token: data
    });

    dispatch({
      type: AUTH_LINK_GOOGLE,
      payload: res.data
    });
  };
}

export const unlinkGoogle = data => {
  return async dispatch => {
    const res = await axios.post('http://localhost:5000/users/oauth/unlink/google');

    dispatch({
      type: AUTH_UNLINK_GOOGLE,
      payload: res.data
    });
  };
}

export const linkFacebook = data => {
  return async dispatch => {
    const res = await axios.post('http://localhost:5000/users/oauth/link/facebook', {
      access_token: data
    });

    dispatch({
      type: AUTH_LINK_FACEBOOK,
      payload: res.data
    });
  };
}

export const unlinkFacebook = data => {
  return async dispatch => {
    const res = await axios.post('http://localhost:5000/users/oauth/unlink/facebook');

    dispatch({
      type: AUTH_UNLINK_FACEBOOK,
      payload: res.data
    });
  };
}

export const oauthFacebook = data => {
  return async dispatch => {
    const res = await axios.post('http://localhost:5000/users/oauth/facebook', {
      access_token: data
    });

    dispatch({
      type: AUTH_SIGN_UP,
      payload: res.data
    });

    localStorage.setItem('JWT_TOKEN', res.data.token);
    axios.defaults.headers.common['Authorization'] = res.data.token;
  };
}

export const signUp = data => {
  return async dispatch => {
    try {
      const res = await axios.post('http://localhost:5000/users/signup', data);

      dispatch({
        type: AUTH_SIGN_UP,
        payload: res.data
      });

      localStorage.setItem('JWT_TOKEN', res.data.token);
      axios.defaults.headers.common['Authorization'] = res.data.token;
    } catch(err) {
      dispatch({
        type: AUTH_ERROR,
        payload: 'Email is already in use'
      })
    }
  };
}

export const signIn = data => {
  return async dispatch => {
    try {
      const res = await axios.post('http://localhost:5000/users/signin', data);

      dispatch({
        type: AUTH_SIGN_IN,
        payload: res.data
      });

      localStorage.setItem('JWT_TOKEN', res.data.token);
      axios.defaults.headers.common['Authorization'] = res.data.token;
    } catch(err) {
      dispatch({
        type: AUTH_ERROR,
        payload: 'Email and password combination isn\'t valid'
      })
    }
  };
}

export const getDashboard = () => {
  return async dispatch => {
    try {
      const res = await axios.get('http://localhost:5000/users/dashboard')

      dispatch({
        type: DASHBOARD_GET_DATA,
        payload: res.data
      })

    } catch(err) {
      console.error('err', err)
    }
  }
}

export const signOut = () => {
  return dispatch => {
    localStorage.removeItem('JWT_TOKEN');
    axios.defaults.headers.common['Authorization'] = '';

    dispatch({
      type: AUTH_SIGN_OUT,
      payload: ''
    })
  };
}
