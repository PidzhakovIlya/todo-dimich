import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {TodoList} from './components/TodoList';

export type FiltersValueType = 'All' | 'Active' | 'Completed';

function App() {
    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);

    const addTask = (title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }
    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    const [filtered, setFiltered] = useState<FiltersValueType>("All")
    let taskForTodoList = tasks

    if (filtered === 'Active') {
        taskForTodoList = tasks.filter((e) => !e.isDone)
    }
    if (filtered === 'Completed') {
        taskForTodoList = tasks.filter((e) => e.isDone)
    }

    const changeFilter = (value: FiltersValueType) => {
        setFiltered(value)
    }


    return (
        <div className="App">
            <TodoList
                title="Wath to learn"
                tasks={taskForTodoList}
                removeTask={removeTask}
                addTask={addTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
