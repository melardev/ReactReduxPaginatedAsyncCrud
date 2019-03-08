import React from 'react';
import {connect} from 'react-redux';
import {fetchTodo, TodoActionCreator} from '../../actions/todo.actions';
import {selectedTodoChanged} from '../../actions/todo.actions';
import {updateTodo, deselectTodo} from '../../actions/todo.actions';
import {NavLink} from "react-router-dom";

class TodoCreateOrEdit extends React.Component {
    /*
    static contextTypes = {
        router: React.PropTypes.object
    };
    */
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            title: '',
            description: '',
            completed: false
        };
    }

    componentWillMount() {
        this.props.fetchTodo(this.props.match.params.id)
    }

    onSubmitForm(event) {
        this.props.updateTodo(this.state)
    }

    componentWillUnmount() {
        if (this.props.todo && this.props.todo.id)
            this.props.deselectTodo();
    }

    onDeleteClick() {
        this.props.deleteTodo(this.props.params.id)
            .then(() => {
                // Todo: Show somethinga dialog, snack etc
                this.context.router.push('/');
            });
    }

    onInputChange(key, evt) {
        if (key === 'completed') {
            this.props.selectedTodoChanged({[key]: evt.target.checked});
        } else
            this.props.selectedTodoChanged({[key]: evt.target.value});
    }

    updateTodo() {
        this.props.updateTodo(this.props.todo);
    }

    render() {
        const {todo, temp_todo} = this.props;
        // todo has to be loaded
        if (!todo || !todo.id) {
            return <div>Loading...</div>
        }

        return (
            <div className="text-center container">
                <div className="row">
                    <div className="col-lg-8 col-md-10 mx-auto">
                        <div className="form-group">
                            <label htmlFor="title"/>Title:
                            <input type="text" name="title" value={todo.title} className="form-control"
                                   onChange={(evt) => this.onInputChange('title', evt)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description"/>Description:
                            <input type="text" name="description" className="form-control"
                                   value={todo.description}
                                   onChange={(evt) => this.onInputChange('description', evt)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="completed"/>Completed:
                            <input id="completed" type="checkbox" name="checkbox" checked={todo.completed}
                                   onChange={(evt) => this.onInputChange('completed', evt)}
                            />
                        </div>
                    </div>
                </div>
                <br/>
                <button className="btn btn-info" onClick={this.updateTodo.bind(this)} disabled={!todo.id}>
                    Update
                </button>
                &nbsp;
                <NavLink className="btn btn-success" to="/">Back to home
                </NavLink>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        todo: state.TodoReducer.selected_todo,
    };
}


export default connect(mapStateToProps, {
    // Each time we call this.props.getTodo() it will trigger dispatch(getTodoAction)
    fetchTodo,
    selectedTodoChanged,
    updateTodo,
    deselectTodo
    // Each time we call this.props.deleteTodo() it will trigger dispatch(getDeleteTodoAction)
})(TodoCreateOrEdit);