import { combineReducers } from 'redux';
import app from './app';

export const actions = {
  app: app.actions,
}

export const reducers = combineReducers({
  app: app.reducers,
})
