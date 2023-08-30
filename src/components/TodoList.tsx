import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FiltersValueType} from "../App";
import {SuperButton} from "./superButton/SuperButton";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    addTask: (value: string) => void
    changeFilter: (value: FiltersValueType)=>void
}
type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export const TodoList: React.FC<TodoListPropsType> = (props) => {
    const [newTitle, setNewTitle] = useState('')

    const addTaskHandler = () => {
        props.addTask(newTitle)
        setNewTitle('')
    }
    const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }
    const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTitle}
                       onChange={inputOnChangeHandler}
                       onKeyDown={keyDownHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {props.tasks.map((t) => {
                    const removeTaskHandler = () => props.removeTask(t.id)
                    return (
                        <li>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={removeTaskHandler}>X</button>
                        </li>
                    )
                })}

            </ul>
            <div>
                <button onClick={() => {
                    props.changeFilter('All')
                }}>All
                </button>
                <button onClick={() => {
                    props.changeFilter('Active')
                }}>Active
                </button>
                <button onClick={() => {
                    props.changeFilter('Completed')
                }}>Completed
                </button>
                <SuperButton name={'Completed'} callBack={() => {
                    props.changeFilter('Completed')}}/>
            </div>
        </div>
    );
};

