import {TodoAction} from "../actions/types";

const INITIAL_STATE = {
    is_loading: false,
    todos_data: {
        page_meta: {},
        todos: []
    },
    selected_todo: {}
};

export const TodoReducer = function (state = INITIAL_STATE, action) {
    switch (action.type) {

        case TodoAction.local.TODO_SET_IS_LOADING:
            return {...state, is_loading: action.is_loading};
        case TodoAction.local.FETCH_TODOS_SUCCESS:
            return {
                ...state,
                is_loading: false,
                todos_data: action.todos_data
            };
        case TodoAction.local.FETCH_TODO_SUCCESS:
            return {...state, selected_todo: action.todo, is_loading: false};
        case TodoAction.local.CREATE_TODO_SUCCESS:
            return {
                ...state, is_loading: false,
                todos_data: {
                    todos: (state.todos_data.todos || []).push(action.todo)
                }
            };
        case TodoAction.local.CHANGE_TODO:
            return {...state, selected_todo: {...state.selected_todo, ...action.changes}};
        case TodoAction.local.UPDATE_TODO_SUCCESS:
            debugger
            return {
                ...state, is_loading: false,
                todos_data: {
                    page_meta: {...state.todos_data.page_meta}, // leave the page_meta as it was
                    todos: state.todos_data.todos.map(todo => { // leave them as they were, except for the updated one
                        if (todo.id === action.id)
                            return {...todo, ...action.todo};
                        else
                            return {...todo};
                    })
                }
            };
        case TodoAction.local.DELETE_TODO_SUCCESS:

            const newState = {
                ...state,
                todos_data: {
                    page_meta: {
                        ...state.todos_data.page_meta
                    },
                    // state.todos_data.todos.filter(todo => todo.id !== action.id);
                    todos: state.todos_data.todos.filter(({id}) => id !== action.todo.id)
                }
            };
            return newState;
        case TodoAction.local.CLEAR_TODO_SELECTED:
            return {...state, selected_todo: {}};
        default:
            return state;
    }
};