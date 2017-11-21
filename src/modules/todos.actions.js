const ADD_TODO = 'app/todos/ADD_TODO';
const FETCH_TODOS_SUCCESS = 'app/todos/FETCH_TODOS_SUCCESS';
const UPDATE_DONE_STATUS = 'app/todos/UPDATE_DONE_STATUS';

export {
    ADD_TODO,
    FETCH_TODOS_SUCCESS,
    UPDATE_DONE_STATUS
};

export function addTodo(todo) {
    return {
        type: ADD_TODO,
        payload: todo
    };
}

function fetchTodosSuccess() {
    return {
        type: FETCH_TODOS_SUCCESS,
        payload: [
            { _id: 1, text: 'Item One', done: false},
            { _id: 2, text: 'Item Two', done: false},
            { _id: 3, text: 'Item Three', done: false}
        ]
    };
}

export function fetchTodos() {
    return dispatch => {
        // Creating promise to simulate promise returned from fetch request.
        return new Promise((resolve) => {
            resolve();
        })
        .then(() => {
            dispatch(fetchTodosSuccess());
        });
    };
}

export function updateDoneStatus(id, doneStatus) {
    return {
        type: UPDATE_DONE_STATUS,
        payload: { _id: id, done: !doneStatus }
    };
}