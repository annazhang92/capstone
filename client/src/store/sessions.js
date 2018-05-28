import axios from 'axios';

const GOT_USER = 'GOT_USER';
const gotUser = user => ({ type: GOT_USER, user });

export const attemptLogin = (credentials, history) => {
  return dispatch => {
    return axios.post('/api/sessions', credentials)
      .then(result => result.data)
      .then(token => {
        window.localStorage.setItem('token', token);
        return token;
      })
      .then(token => dispatch(getUserFromToken(token)))
      .then(() => history.push('/'))
      .catch(err => {
        window.localStorage.removeItem('token');
        return err;
      });
  };
};

export const getUserFromToken = token => {
  return dispatch => {
    return axios.get(`/api/sessions/${token}`)
      .then(result => result.data)
      .then(user => dispatch(gotUser(user)))
      .catch(err => {
        window.localStorage.removeItem('token');
        return err;
      });
  };
};

const store = (state = {}, action) => {
  switch (action.type) {
  case GOT_USER:
    return action.user;
  default:
    return state;
  }
};

export default store;
