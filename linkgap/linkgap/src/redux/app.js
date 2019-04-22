import { createActions, handleActions, combineActions } from 'redux-actions';

const actions = createActions({
  SET_USERNAME: username => ({ username }),
  SET_TOKEN: token => ({ token }),
  SET_USER: user => ({ user }),
})

const {
  setUsername, setToken, setUser,
} = actions;

const reducers = handleActions({
  [combineActions(
    setUsername, setToken, setUser,
  )]: (state, { payload }) => ({ ...state, ...payload }),
}, {
  username: null,
  token: null,
  user: null,
})

export default {
  actions,
  reducers,
}
