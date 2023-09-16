import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FiltersValueType} from "../App";
import {SuperButton} from "./superButton/SuperButton";
import '../App.css';


type TodoListPropsType = {
    id:string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeFilter: (value: FiltersValueType, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    filtered: FiltersValueType
    removeTodoList:(todoListId:string)=>void
}
type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export const TodoList: React.FC<TodoListPropsType> = (props) => {
    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (newTitle.trim() !== '') {
            props.addTask(newTitle.trim(), props.id)
            setNewTitle('')
        }else{
            setError("Field is requred")
        }
    }
    const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }
    const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }


    const todoListTasks = props.tasks.map((t) => {
        const inputCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
        }
        const removeTaskHandler = () => props.removeTask(t.id, props.id)
        return (
            <li className={t.isDone? 'is-done' : ''}>
                <input
                       type="checkbox"
                       onChange={inputCheckBoxHandler}
                       checked={t.isDone}

                />
                <span >{t.title}</span>
                <button onClick={removeTaskHandler}>X</button>
            </li>
        )
    })

    const removeTodoList  = () =>{
        props.removeTodoList(props.id)
    }

    return (
        <div>
            <h3>{props.title} <button onClick={removeTodoList}>X</button> </h3>
            <div>
                <input value={newTitle}
                       onChange={inputOnChangeHandler}
                       onKeyDown={keyDownHandler}
                       className={error? 'error': ''}
                />
                <button onClick={addTaskHandler}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul className='todoListTasks'>
                {todoListTasks}
            </ul>
            <div>
                <button className={props.filtered === 'All'? 'active-filter': ''} onClick={() => {
                    props.changeFilter('All', props.id)
                }}>All
                </button>
                <button className={props.filtered === 'Active'? 'active-filter': ''} onClick={() => {
                    props.changeFilter('Active', props.id)
                }}>Active
                </button>
                <button className={props.filtered === 'Completed'? 'active-filter': ''} onClick={() => {
                    props.changeFilter('Completed', props.id)
                }}>Completed
                </button>
            </div>
        </div>
    );
};

