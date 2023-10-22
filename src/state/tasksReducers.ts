import {v1} from "uuid";
import {TaskStateType} from "../App";
import {addTodolistsACType, removeTodolistACType, todoListId1, todoListId2} from "./todolistsReducers";
import {useReducer} from "react";

type addTaskACType = ReturnType<typeof addTaskAC>
export type removeTaskACType = ReturnType<typeof removeTaskAC>
type changeStatusTaskACType = ReturnType<typeof changeStatusTaskAC>
type changeTitleTaskACType = ReturnType<typeof changeTitleTaskAC>

type ActionType = addTaskACType | removeTaskACType | changeStatusTaskACType | changeTitleTaskACType | addTodolistsACType | removeTodolistACType ;


const initialState:TaskStateType = {
    [todoListId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},],
    [todoListId2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "Book", isDone: true},
        {id: v1(), title: "bread", isDone: false},
        {id: v1(), title: "Cola", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},],

}

export const tasksReducer = (state = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "ADD-TASK": {
            return {
                ...state, [action.payload.todolistId]: [{
                    id: v1(), title: action.payload.title, isDone: false
                }, ...state[action.payload.todolistId]]
            }
        }
        case "REMOVE-TASK": {
            return {...state, [action.payload.todolistId]:state[action.payload.todolistId].filter(el=>el.id !== action.payload.id)}
        }
        case "CHANGE-STATUS-TASK": {
            return {...state, [action.payload.todolistId]:state[action.payload.todolistId].map(task=>task.id === action.payload.taskId? {...task, isDone:action.payload.isDone}: task)}
        }
        case "CHANGE-TASK-TITLE": {
            return {...state ,[action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {...el, title: action.payload.title} : el)}
        }
        case "ADD-TODOLIST":{
            return {...state, [action.payload.id]:[]}
        }
        case 'REMOVE-TODOLIST':{
            let stateCopy = {...state}
            delete stateCopy[action.payload.todolistId]
            return stateCopy
        }
        default:
            return state
    }
}


export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            todolistId,
            title
        }
    } as const
}
export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            id,
            todolistId
        }
    } as const
}
export const changeStatusTaskAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {
        type: "CHANGE-STATUS-TASK",
        payload: {
            todolistId,
            taskId,
            isDone
        }
    } as const
}
export const changeTitleTaskAC = (todolistId: string, taskId:string, title:string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: {
            todolistId,
            taskId,
            title
        }
    } as const
}