export const initialState = {
    todos: [
    ],
}

const Reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case "SET_TODOS":
            return {
                ...state,
                todos: payload
            };
        case "ADD_TODO":
            return {
                ...state,
                todos: [...state.todos, payload]
            };
        case "COMPLETE": {
            return {
                ...state,
                todos: state.todos.map((todo) => {
                    if (todo.id === payload) {
                        return { ...todo, checked: !todo.checked };
                    } else {
                        return todo;
                    }
                })
            };
        }
        case 'UPDATE' : {
            return {
                ...state,
                todos: state.todos.map((todo) => {
                    if (todo.id === payload.idTodo) {
                        return { ...todo, name: payload.name, des : payload.des };
                    } else {
                        return todo;
                    }
                })
            }
        }
        case 'DELETE' : {
            return {
                ...state, 
                todos : state.todos.filter(todo => todo.id !== payload.idTodo)
            }
        }

        default:
            return state;
    }
};

export default Reducer;