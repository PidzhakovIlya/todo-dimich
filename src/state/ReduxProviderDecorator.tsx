import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "./tasksReducers";
import {todolistsReducer} from "./todolistsReducers";
import {v1} from "uuid";
import {AppRootStateType} from "./store";
import {Provider} from "react-redux";
import React from "react";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer
})

const initialGlobalState: AppRootStateType = {
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "React Book", isDone: true}
        ]
    },
    todoLists: [
        {id: "todolistId1", title: "What to learn", filter: "All"},
        {id: "todolistId2", title: "What to buy", filter: "All"}
    ]
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}