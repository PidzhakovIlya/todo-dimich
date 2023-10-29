import React, {ChangeEvent, memo, useCallback} from "react";
import {EditableSpan} from "./components/EditableSpan";
import {TaskType} from "./TodoList";

type TaskPropsType = {
    changTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    removeTask: (id: string, todoListId: string) => void
    task: TaskType
    todolistId: string
}
export const Task = memo((props: TaskPropsType) => {

    const inputCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.todolistId, props.task.id, e.currentTarget.checked)
    }

    const onChangeTitleHandler = useCallback((title: string) => {
        props.changTaskTitle(props.todolistId, props.task.id, title)
    }, [props.changTaskTitle, props.todolistId, props.task.id])

    const removeTaskHandler = () => props.removeTask(props.task.id, props.todolistId)


    return (
        <li key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
            <input
                type="checkbox"
                onChange={inputCheckBoxHandler}
                checked={props.task.isDone}

            />
            <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
            <button onClick={removeTaskHandler}>X</button>
        </li>
    )
})