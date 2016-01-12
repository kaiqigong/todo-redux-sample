import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { actions as todosActions, VisibilityFilters } from '../../redux/modules/todoApp';
import AddTodo from 'components/AddTodo';
import TodoList from 'components/TodoList';
import Footer from 'components/TodoFooter';

const mapStateToProps = (state) => ({
  todoApp: state.todoApp
});

function selectTodos (todos, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed);
  }
}

export class TodoView extends React.Component {
  static propTypes = {
    todoApp: React.PropTypes.object.isRequired,
    addTodo: React.PropTypes.func.isRequired,
    completeTodo: React.PropTypes.func.isRequired,
    setVisibilityFilter: React.PropTypes.func.isRequired
  };

  render () {
    const {todos, visibilityFilter} = this.props.todoApp;
    const visibleTodos = selectTodos(todos, visibilityFilter);

    return (
      <div className='container text-center'>
        <h1>TODOS</h1>
        <TodoList
          todos={visibleTodos}
          onTodoClick={id => this.props.completeTodo(id)} />
        <AddTodo onAddClick={text => this.props.addTodo(text)} />
        <Footer
          filter={visibilityFilter}
          onFilterChange={nextFilter => this.props.setVisibilityFilter(nextFilter)} />
        <hr />
        <Link to='/'>Go to Home</Link>
      </div>
    );
  }
}

export default connect(mapStateToProps, todosActions)(TodoView);
