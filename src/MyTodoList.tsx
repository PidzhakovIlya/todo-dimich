import React, {ChangeEvent} from "react";
import {FiltersValueType} from "./App";
import "./App.css";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskStateType, TodoListsType} from "./AppWithRedux";
import {addTaskAC, changeStatusTaskAC, changeTitleTaskAC, removeTaskAC} from "./state/tasksReducers";
import {changeFilterTodolistAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolistsReducers";


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
    changTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodoListTitle: (todolistId: string, title: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {
    todolist: TodoListsType
}


export const MyTodoList = ({todolist}: TodolistType) => {
    const {id, title, filter} = todolist

    const dispatch = useDispatch()

    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[id])

    if (filter === "Active") {
        tasks = tasks.filter((e) => !e.isDone)
    }
    if (filter === "Completed") {
        tasks = tasks.filter((e) => e.isDone)
    }

    const todoListTasks = tasks.map((t) => {
        const inputCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(changeStatusTaskAC(id, t.id, e.currentTarget.checked))
        }
        const onChangeStatusHandler = (title: string) => {
            dispatch(changeTitleTaskAC(id, t.id, title))
        }
        const removeTaskHandler = () => dispatch(removeTaskAC(t.id, id))


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
        dispatch(removeTodolistAC(id))
    }
    const addTask = (title: string) => {
        dispatch(addTaskAC(id, title))
    }

    const changeTodoTitle = (title: string) => {
        dispatch(changeTodolistTitleAC(id, title))
    }


    return (
        <div>
            <h3>
                <EditableSpan title={title} onChange={changeTodoTitle}/>
                <button onClick={removeTodoList}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul className="todoListTasks">
                {todoListTasks}
            </ul>
            <div>
                <button className={filter === "All" ? "active-filter" : ""} onClick={() => {
                    dispatch(changeFilterTodolistAC(id, "All"))
                }}>All
                </button>
                <button className={filter === "Active" ? "active-filter" : ""} onClick={() => {
                    dispatch(changeFilterTodolistAC(id, "Active"))
                }}>Active
                </button>
                <button className={filter === "Completed" ? "active-filter" : ""} onClick={() => {
                    dispatch(changeFilterTodolistAC(id, "Completed"))
                }}>Completed
                </button>
            </div>
        </div>
    );
};


