
import { Todo } from '../todos/models/todo.model';

export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todos: [
        new Todo('Pieda del alma'),
        new Todo('Pieda del espacio'),
        new Todo('Pieda del tiempo'),
        new Todo('Pieda del poder'),
        new Todo('Pieda del realidad'),
    ],
    filter: Filters.All,
}

const initStore = () => {
    loadStore();
    console.log('InitStore');

}

const loadStore = () => {
    if(!localStorage.getItem('state')) return;

    const { todos = [], filter = Filters.All } = JSON.parse( localStorage.getItem('state'));
    state.todos = todos;
    state.filter = filter;
}

const saveStateToLocalStorage = () => {

    localStorage.setItem('state', JSON.stringify(state));

}

const getTodos = ( filter = Filters.All ) => {

    switch( filter ) {
        case Filters.All:
            return [...state.todos];

            case Filters.Completed:
                return state.todos.filter( todo => todo.done ); // si esta en true devuelve un nuevo arreglo

            case Filters.Pending:
                return state.todos.filter( todo => !todo.done ); // si esta en false

            default:
                throw new Error(`Option ${ filter } is not valid.`);
    }

}

/**
 * 
 * @param {String} description 
 */
const addTodo = ( description ) => {
    
    if( !description ) throw new Error('Description is required');
    state.todos.push( new Todo(description) );

    saveStateToLocalStorage();
}

/**
 * 
 * @param {String} todoId 
 */
const toggleTodo = ( todoId ) => {

    state.todos = state.todos.map( todo => {
        if( todo.id === todoId ) {
            todo.done = !todo.done;
        }
        return todo;
    });

    saveStateToLocalStorage();
}

/**
 * 
 * @param {String} todoId 
 */
const deleteTodo = ( todoId ) => {
    state.todos = state.todos.filter( todo => todo.id !== todoId ); // el metodo filter verifica cuando barre el store que el id del todo sea distinto del que recibe como argumento. De esta manera retorna un nuevo array con todos los todo que no coinciden eliminando el que si coincide.

    saveStateToLocalStorage();
}

const deleteTodoCompleted = () => {
    state.todos = state.todos.filter( todo => !todo.done ); // con el metodo filter busca todos los que estan completados y se actualiza el store

    saveStateToLocalStorage();
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = ( newFilter = Filters.All ) => {
    state.filter = newFilter;
}

const getCurrentFilter = () => {
    return state.filter;
}

export default {
    addTodo,
    deleteTodo,
    deleteTodoCompleted,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}