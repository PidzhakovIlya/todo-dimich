import React, {useReducer, useState} from "react";
import "./App.css";
import {v1} from "uuid";
import {TaskType, TodoList} from "./TodoList";
import {AddItemForm} from "./components/AddItemForm";
import {
    addTodolistsAC,
    changeFilterTodolistAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolistsReducers";
import {addTaskAC, changeStatusTaskAC, changeTitleTaskAC, removeTaskAC, tasksReducer} from "./state/tasksReducers";

export type FiltersValueType = "All" | "Active" | "Completed";

export type TodoListsType = {
    id: string
    title: string
    filter: FiltersValueType
}

export type TaskStateType = {
    [key: string]:TaskType[]
}


function AppWithReducers() {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, dispatchToTodoListsReducer] = useReducer(todolistsReducer,[
        {id: todoListId1, title: "What to learn", filter: "All"},
        {id: todoListId2, title: "What to buy", filter: "Active"}
    ])

    const [tasksObj, dispatchToTasksReducers] = useReducer(tasksReducer ,{
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

    })

    const addTask = (title: string, todoListId: string) => {

        dispatchToTasksReducers(addTaskAC(todoListId, title))
    }
    const removeTask = (id: string, todoListId: string) => {
       dispatchToTasksReducers(removeTaskAC(id, todoListId))
    }
    const changeStatus = (todoListId: string, taskId: string, isDone: boolean) => {
     dispatchToTasksReducers(changeStatusTaskAC(todoListId,taskId,isDone))

    }
    const changTaskTitle = (todolistId:string, taskId:string, title:string)=>{
        dispatchToTasksReducers(changeTitleTaskAC(todolistId,taskId,title))
    }

    const addTodolist = (title:string) =>{
        let action = addTodolistsAC(title)
        dispatchToTodoListsReducer(action)
        dispatchToTasksReducers(action)
    }
    const changeFilter = (value: FiltersValueType, todoListId: string) => {
        dispatchToTodoListsReducer(changeFilterTodolistAC(todoListId, value))
    }
    const removeTodoList = (todoListId: string) => {
        dispatchToTodoListsReducer(removeTodolistAC(todoListId))
        dispatchToTasksReducers(removeTodolistAC(todoListId))
    }
    const changeTodoListTitle = (todolistId:string, title:string) =>{
       dispatchToTodoListsReducer(changeTodolistTitleAC(todolistId, title))
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todoLists.map(tl => {
                let taskForTodoList = tasksObj[tl.id]

                if (tl.filter === "Active") {
                    taskForTodoList = tasksObj[tl.id].filter((e) => !e.isDone)
                }
                if (tl.filter === "Completed") {
                    taskForTodoList = tasksObj[tl.id].filter((e) => e.isDone)
                }
                return (
                    <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={taskForTodoList}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                        changTaskTitle={changTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                )
            })}

        </div>
    );
}

export default AppWithReducers;

