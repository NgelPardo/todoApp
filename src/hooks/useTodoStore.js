import { useDispatch, useSelector } from "react-redux"
import { onAddNewTodo, onDeleteTodo, onSetActiveTodo, onUpdateTodo, setSearchState } from "../store";

export const useTodoStore = () => {

    const dispatch = useDispatch();
    const { 
        todos, 
        activeTodo,
        searchState
    } = useSelector( state => state.todo );

    const setSearchTodo = ({target}) => {
        dispatch( setSearchState( target.value ) )
    }

    const setActiveTodo = ( todo ) => {
        dispatch( onSetActiveTodo( todo ) )
    }

    const startSavingTodo = async( todo ) => {
        //TODO: llegar al backend

        if ( todo.id ) {
            //actualizando
            dispatch( onUpdateTodo({ ...todo }) );
        } else {
            //creando
            dispatch( onAddNewTodo({ ...todo, id: new Date().getTime()}))
        }
    }

    const deleteEvent = () => {
        dispatch( onDeleteTodo() );
    }

    return {
        todos,
        activeTodo,
        searchState,

        setSearchTodo,
        deleteEvent,
        setActiveTodo,
        startSavingTodo
    }
}