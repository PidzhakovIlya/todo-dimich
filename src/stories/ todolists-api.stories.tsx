import React, {useEffect, useState} from "react"
import {todolistsApi} from "../api/todolists-api";

export default {
    title: "API"
}

// const settings = {
//     withCredentials: true,
//     headers: {
//         "API-KEY": "23d212d6-5705-4d11-bb70-b9858302554f"
//     }
// }

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.getTodolists()
            .then((res) => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.createTodolist("hello")
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "38355c3f-335d-41d3-b007-4b77b01de6ac"
        todolistsApi.deleteTodolist(todolistId)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.updateTodolist("dsfgsdf", "New Title")
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolist = "220e40c5-b314-4c2d-a401-bc5cd7544e35"
        todolistsApi.getTasks(todolist)
            .then(res => setState(res.data))
    }, []);
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "220e40c5-b314-4c2d-a401-bc5cd7544e35"
        const taskId = "220e40c5-b314-4c2d-a401"
        todolistsApi.deleteTask(todolistId, taskId)
            .then(res => setState(res.data))
    }, []);
    return <div>{JSON.stringify(state)}</div>
}

