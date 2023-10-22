import React from "react";
import "./App.css";
import {TaskType, TodoList} from "./TodoList";
import {AddItemForm} from "./components/AddItemForm";
import {
    addTodolistsAC,
    changeFilterTodolistAC,
    changeTodolistTitleAC,
    removeTodolistAC,

} from "./state/todolistsReducers";
import {addTaskAC, changeStatusTaskAC, changeTitleTaskAC, removeTaskAC} from "./state/tasksReducers";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {MyTodoList} from "./MyTodoList";

export type FiltersValueType = "All" | "Active" | "Completed";

export type TodoListsType = {
    id: string
    title: string
    filter: FiltersValueType
}

export type TaskStateType = {
    [key: string]:TaskType[]
}


function AppWithRedux() {
    const todoLists = useSelector<AppRootStateType, Array<TodoListsType>>(state=>state.todoLists)
    const tasksObj = useSelector<AppRootStateType, TaskStateType>(state=>state.tasks)
    const dispatch = useDispatch()



    const addTask = (title: string, todoListId: string) => {
        dispatch(addTaskAC(todoListId, title))
    }
    const removeTask = (id: string, todoListId: string) => {
        dispatch(removeTaskAC(id, todoListId))
    }
    const changeStatus = (todoListId: string, taskId: string, isDone: boolean) => {
        dispatch(changeStatusTaskAC(todoListId,taskId,isDone))

    }
    const changTaskTitle = (todolistId:string, taskId:string, title:string)=>{
        dispatch(changeTitleTaskAC(todolistId,taskId,title))
    }

    const addTodolist = (title:string) =>{
        let action = addTodolistsAC(title)
        dispatch(action)
    }
    const changeFilter = (value: FiltersValueType, todoListId: string) => {
        dispatch(changeFilterTodolistAC(todoListId, value))
    }
    const removeTodoList = (todoListId: string) => {
        dispatch(removeTodolistAC(todoListId))
    }
    const changeTodoListTitle = (todolistId:string, title:string) =>{
        dispatch(changeTodolistTitleAC(todolistId, title))
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todoLists.map(tl => {
                let taskForTodoList = tasksObj[tl.id]

                // if (tl.filter === "Active") {
                //     taskForTodoList = tasksObj[tl.id].filter((e) => !e.isDone)
                // }
                // if (tl.filter === "Completed") {
                //     taskForTodoList = tasksObj[tl.id].filter((e) => e.isDone)
                // }
                return (
                    // <TodoList
                    //     key={tl.id}
                    //     id={tl.id}
                    //     title={tl.title}
                    //     tasks={taskForTodoList}
                    //     removeTask={removeTask}
                    //     addTask={addTask}
                    //     changeFilter={changeFilter}
                    //     changeTaskStatus={changeStatus}
                    //     filtered={tl.filter}
                    //     removeTodoList={removeTodoList}
                    //     changTaskTitle={changTaskTitle}
                    //     changeTodoListTitle={changeTodoListTitle}
                    // />
                    <MyTodoList todolist={tl}/>
                )
            })}

        </div>
    );
}

export default AppWithRedux;

