/*
 * action types
 */
import {combineReducers} from 'redux';
import {createAction, handleActions} from 'redux-actions';
import _ from 'lodash';

export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

/*
 * other constants
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

/*
 * action creators
 */

export const addTodo = createAction(ADD_TODO, (text) => {
  return text;
});

export const completeTodo = createAction(COMPLETE_TODO, (id) => {
  return id;
});

export const setVisibilityFilter = createAction(SET_VISIBILITY_FILTER, (filter) => {
  return filter;
});

export const actions = {
  addTodo,
  completeTodo,
  setVisibilityFilter
};

const visibilityFilter = handleActions({
  [SET_VISIBILITY_FILTER]: (state = VisibilityFilters.SHOW_ALL, {payload}) => {
    return payload;
  }
}, VisibilityFilters.SHOW_ALL);

const todos = handleActions({
  [ADD_TODO]: (state = [], {payload}) => {
    return [
      ...state,
      {
        text: payload,
        completed: false,
        id: Date.now()
      }
    ];
  },
  [COMPLETE_TODO]: (state = [], {payload}) => {
    const index = _.findIndex(state, {id: payload});
    return [
      ...state.slice(0, index),
      Object.assign({}, state[index], {
        completed: true
      }),
      ...state.slice(index + 1)
    ];
  }
}, []);

const todoApp = combineReducers({
  visibilityFilter,
  todos
});

export default todoApp;
