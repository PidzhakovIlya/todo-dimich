import {FiltersValueType, TodoListsType} from "../App";
import {v1} from "uuid";
import {removeTaskACType} from "./tasksReducers";
import {useReducer} from "react";

export let todoListId1 = v1();
export let todoListId2 = v1();

let initialState: TodoListsType[] = [
    {id: todoListId1, title: "What to learn", filter: "All"},
    {id: todoListId2, title: "What to buy", filter: "Active"}
]


export const todolistsReducer = (state = initialState, action: ActionType): Array<TodoListsType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.payload.todolistId)
        }
        case "ADD-TODOLIST": {
            return [{id: action.payload.id, title: action.payload.title, filter: "All"}, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(el => el.id === action.payload.todolistId ? {...el, title: action.payload.title} : el)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(el => el.id === action.payload.todolistId ? {...el, filter: action.payload.filter} : el)
        }
        default:
            return state
    }
}


type ActionType = removeTodolistACType | addTodolistsACType | changeTodolistTitleACType | changeFilterTodolistACType;

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            todolistId
        }
    } as const
}

export type addTodolistsACType = ReturnType<typeof addTodolistsAC>

export const addTodolistsAC = (title: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            title,
            id: v1()
        }
    } as const
}
type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>

export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: {
            title,
            todolistId
        }
    } as const
}

type changeFilterTodolistACType = ReturnType<typeof changeFilterTodolistAC>

export const changeFilterTodolistAC = (todolistId: string, filter: FiltersValueType) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        payload: {
            todolistId,
            filter
        }
    } as const
}