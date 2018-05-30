import axios from 'axios';

const GET_ORGANIZATION_REQUESTS = 'GET_ORGANIZATION_REQUESTS';
const CREATE_ORGANIZATION_REQUEST = 'CREATE_ORGANIZATION_REQUEST';

const getOrganizationRequests = organizationRequests => ({ type: GET_ORGANIZATION_REQUESTS, organizationRequests });
const createOrganizationRequest = organizationRequest => ({ type: CREATE_ORGANIZATION_REQUEST, organizationRequest });

export const getOrganizationRequestsFromServer = () => {
  return dispatch => {
    return axios.get('/api/organizationRequests')
      .then(result => result.data)
      .then(organizationRequests => dispatch(getOrganizationRequests(organizationRequests)));
  };
};

export const createOrganizationRequestOnServer = (organizationRequest) => {
  return dispatch => {
    return axios.post('/api/organizationRequests', organizationRequest)
      .then(result => result.data)
      .then(organizationRequest => dispatch(createOrganizationRequest(organizationRequest)));
  };
};

const store = (state = [], action) => {
  switch (action.type) {
    case GET_ORGANIZATION_REQUESTS:
      return action.organizationRequests;
    case CREATE_ORGANIZATION_REQUEST:
      return [ ...state, action.organizationRequests ];
    default:
      return state;
  }
};

export default store;
