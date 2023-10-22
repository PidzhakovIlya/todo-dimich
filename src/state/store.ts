import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "./tasksReducers";
import {todolistsReducer} from "./todolistsReducers";

export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer
})



export const store = legacy_createStore(rootReducer)

