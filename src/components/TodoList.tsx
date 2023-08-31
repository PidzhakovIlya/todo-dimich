import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FiltersValueType} from "../App";
import {SuperButton} from "./superButton/SuperButton";
import '../App.css';


type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    addTask: (title: string) => void
    changeFilter: (value: FiltersValueType) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filtered: FiltersValueType
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
            props.addTask(newTitle.trim())
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
            props.changeTaskStatus(t.id, e.currentTarget.checked)
        }
        const removeTaskHandler = () => props.removeTask(t.id)
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

    return (
        <div>
            <h3>{props.title}</h3>
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
                    props.changeFilter('All')
                }}>All
                </button>
                <button className={props.filtered === 'Active'? 'active-filter': ''} onClick={() => {
                    props.changeFilter('Active')
                }}>Active
                </button>
                <button className={props.filtered === 'Completed'? 'active-filter': ''} onClick={() => {
                    props.changeFilter('Completed')
                }}>Completed
                </button>
                <SuperButton  name={'Completed'} callBack={() => {
                    props.changeFilter('Completed')
                }}/>
            </div>
        </div>
    );
};

