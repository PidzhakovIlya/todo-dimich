import React, {memo, useCallback} from "react";
import {FiltersValueType} from "./App";
import "./App.css";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Task} from "./Task";


type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    addTask: (title: string, todoListId: string) => void
    changeFilter: (value: FiltersValueType, todoListId: string) => void
    filter: FiltersValueType
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (todolistId: string, title: string) => void
    changTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    removeTask: (id: string, todoListId: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export const TodoList: React.FC<TodoListPropsType> = memo((props) => {

    console.log("Todo render")
    let tasks = props.tasks

    if (props.filter === "Active") {
        tasks = props.tasks.filter((e) => !e.isDone)
    }
    if (props.filter === "Completed") {
        tasks = props.tasks.filter((e) => e.isDone)
    }
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const changeTodoTitle = useCallback((title: string) => {
        props.changeTodoListTitle(props.id, title)
    }, [props.id, props.changeTodoListTitle])

    const onAllClickHandler = useCallback(() => {
        props.changeFilter("All", props.id)
    }, [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter("Active", props.id)
    }, [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter("Completed", props.id)
    }, [props.changeFilter, props.id])


    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodoTitle}/>
                <button onClick={removeTodoList}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul className="todoListTasks">
                {
                    tasks.map((t) => <Task key={t.id}
                                           changTaskTitle={props.changTaskTitle}
                                           changeTaskStatus={props.changeTaskStatus}
                                           removeTask={props.removeTask}
                                           task={t}
                                           todolistId={props.id}/>
                    )
                }
            </ul>
            <div>
                <button className={props.filter === "All" ? "active-filter" : ""}
                        onClick={onAllClickHandler}>
                    All
                </button>
                <button className={props.filter === "Active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>
                    Active
                </button>
                <button className={props.filter === "Completed" ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>
                    Completed
                </button>
            </div>
        </div>
    );
});


