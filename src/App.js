import React, {useEffect} from "react";
import TodoList from "./Todo/TodoList";
import {useState} from "react";
import Context from "./context";
import Loader from './Loader';
import Modal from "./Modal/Modal";


const AddTodo = React.lazy(() => new Promise(res => {
    setTimeout(() => {
res(import('./Todo/AddTodo'))
    }, 3000)
}))

function App() {

    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
            .then(response => response.json())
            .then(todos => {
                setTimeout(() => {

                }, 2000)
                setTodos(todos);
                setLoading(false);
            })
    }, [])

    function toggleTodo(id) {
        setTodos(todos.map(el => {
                if (el.id === id) {
                    el.completed = !el.completed
                }
                return el;
            })
        )
    }

    function removeTodo(id) {
        setTodos(todos.filter(todo => todo.id !== id))
    };

    const addTodo = (title) => {
        setTodos(todos.concat([{
            title, id: Date.now(), completed: false
        }]))
    }

    return (
        <Context.Provider value={{removeTodo}}>

            <div className="wrapper">
                <h1>React minin1</h1>

                <Modal />

                <React.Suspense fallback={<p>Loaging...</p>}>
                <AddTodo onCreate={addTodo}/>
                </React.Suspense>

                {loading && <Loader/>}
                {todos.length ?
                    (<TodoList todos={todos} onToggle={toggleTodo}/>
                    ) :
                    loading ? null
                        : (< p> No Todos < /p>)
                }
            </div>

        </Context.Provider>
    );
}

export default App;
