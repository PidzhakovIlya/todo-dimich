import {FiltersValueType, TodoListsType} from "../App";
import {v1} from "uuid";



export const todolistsReducer = (state: TodoListsType[], action: ActionType): Array<TodoListsType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.payload.todolistId)
        }
        case "ADD-TODOLIST": {
            return [...state, {id: v1(), title: action.payload.title, filter: "All"}]
        }
        case "CHANGE-TODOLIST-TITLE":{
            return  state.map(el=>el.id === action.payload.todolistId? {...el, title: action.payload.title}: el)
        }
        case "CHANGE-TODOLIST-FILTER":{
            return  state.map(el=>el.id === action.payload.todolistId? {...el, filter: action.payload.filter}: el)
        }
        default:
            return state
    }
}


type ActionType = removeTodolistsACType | addTodolistsACType | changeTodolistTitleACType | changeFilterTodolistACType;

type removeTodolistsACType = ReturnType<typeof removeTodolistsAC>

export const removeTodolistsAC = (todolistId: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            todolistId
        }
    } as const
}

type addTodolistsACType = ReturnType<typeof addTodolistsAC>

export const addTodolistsAC = (title:string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            title,
        }
    } as const
}
type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>

export const changeTodolistTitleAC = (title:string, todolistId:string) => {
    return{
        type: "CHANGE-TODOLIST-TITLE",
        payload:{
            title,
            todolistId
        }
    } as const
}

type changeFilterTodolistACType = ReturnType<typeof changeFilterTodolistAC>

export const changeFilterTodolistAC = (todolistId:string, filter:FiltersValueType) =>{
    return {
        type: "CHANGE-TODOLIST-FILTER",
        payload: {
            todolistId,
            filter
        }
    } as const
}