import { createSlice } from "@reduxjs/toolkit";
import data from '../../data/todos.json';

export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todos: data,
        activeTodo: null,
        searchState: '',
    }, 
    reducers: {
        onSetActiveTodo: ( state, { payload }) => {
            state.activeTodo = payload;
        },
        onAddNewTodo: ( state, { payload }) => {
            state.todos.push( payload );
            state.activeTodo = null;
        },
        onUpdateTodo: ( state, { payload }) => {
            state.todos = state.todos.map( todo => {
                if( todo.id === payload.id ) {
                    return payload;
                }
                return todo;
            })
        },
        onDeleteTodo: ( state ) => {
            state.todos = state.todos.filter( todo => todo.id !== state.activeTodo.id );
            state.activeTodo = null;
        },
        setSearchState: ( state, { payload } ) => {
            state.searchState = payload;
        },
    },
});

export const { 
    onSetActiveTodo, 
    onAddNewTodo, 
    onUpdateTodo, 
    onDeleteTodo, 
    setSearchState 
} = todoSlice.actions;