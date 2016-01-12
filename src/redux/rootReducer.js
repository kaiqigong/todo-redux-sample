import { combineReducers } from 'redux';
import { routeReducer as router } from 'redux-simple-router';
import counter from './modules/counter';
import todoApp from './modules/todoApp';

export default combineReducers({
  counter,
  todoApp,
  router
});
