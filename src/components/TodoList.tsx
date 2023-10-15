import React, {ChangeEvent} from "react";
import {FiltersValueType} from "../App";
import "../App.css";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeFilter: (value: FiltersValueType, todoListId: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    filtered: FiltersValueType
    removeTodoList: (todoListId: string) => void
    changTaskTitle:(todolistId:string, taskId:string, title:string)=>void
    changeTodoListTitle:(todolistId:string, title:string)=>void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export const TodoList: React.FC<TodoListPropsType> = (props) => {

    const todoListTasks = props.tasks.map((t) => {
        const inputCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(props.id, t.id, e.currentTarget.checked)
        }
        const onChangeStatusHandler = (title:string) =>{
            props.changTaskTitle(props.id, t.id, title)
        }
        const removeTaskHandler = () => props.removeTask(t.id, props.id)
        return (
            <li className={t.isDone ? "is-done" : ""}>
                <input
                    type="checkbox"
                    onChange={inputCheckBoxHandler}
                    checked={t.isDone}

                />
                <EditableSpan title={t.title} onChange={onChangeStatusHandler}/>
                <button onClick={removeTaskHandler}>X</button>
            </li>
        )
    })

    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodoTitle =(title:string)=>{
        props.changeTodoListTitle(props.id, title)
    }
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodoTitle}/>
                <button onClick={removeTodoList}>X</button>
            </h3>
            <AddItemForm addItem={addTask} />
            <ul className="todoListTasks">
                {todoListTasks}
            </ul>
            <div>
                <button className={props.filtered === "All" ? "active-filter" : ""} onClick={() => {
                    props.changeFilter("All", props.id)
                }}>All
                </button>
                <button className={props.filtered === "Active" ? "active-filter" : ""} onClick={() => {
                    props.changeFilter("Active", props.id)
                }}>Active
                </button>
                <button className={props.filtered === "Completed" ? "active-filter" : ""} onClick={() => {
                    props.changeFilter("Completed", props.id)
                }}>Completed
                </button>
            </div>
        </div>
    );
};


