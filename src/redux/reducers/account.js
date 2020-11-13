import * as actionTypes from '../actions/actionTypes';

const initState = { token: null, refresh: null, user: {} };

function account(state = initState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return ({
        isFetching: true,
      })

    case actionTypes.LOGIN_SUCCESS:
      return ({
        isFetching: false,
        isLoggedIn: true,
        token: action.response.access,
        user: action.response.user_info,
      })

    case actionTypes.LOGIN_FAILURE:
      return ({
        isFetching: false,
      })

    case actionTypes.LOGOUT_REQUEST:
      return ({
        isFetching: true,
      })

    case actionTypes.LOGOUT_SUCCESS:
      return ({
        isFetching: false,
        isLoggedIn: false,
        user: {},
      })

    case actionTypes.LOGOUT_FAILURE:
      return ({
        isFetching: false,
      })
      
    default:
      return state;
  }
}

export default account;
