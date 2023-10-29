import React, {memo, useCallback} from "react";
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
    console.log("App render")
    const todoLists = useSelector<AppRootStateType, Array<TodoListsType>>(state=>state.todoLists)
    const tasksObj = useSelector<AppRootStateType, TaskStateType>(state=>state.tasks)
    const dispatch = useDispatch()



    const addTask = useCallback((title: string, todoListId: string) => {
        dispatch(addTaskAC(todoListId, title))
    },[dispatch]);
    const removeTask = useCallback((id: string, todoListId: string) => {
        dispatch(removeTaskAC(id, todoListId))
    },[dispatch]);
    const changeStatus = useCallback((todoListId: string, taskId: string, isDone: boolean) => {
        dispatch(changeStatusTaskAC(todoListId,taskId,isDone))
    },[dispatch]);
    const changTaskTitle = useCallback((todolistId:string, taskId:string, title:string)=>{
        dispatch(changeTitleTaskAC(todolistId,taskId,title))
    },[dispatch]);

    const addTodolist = useCallback((title:string) =>{
        let action = addTodolistsAC(title)
        dispatch(action)
    }, [dispatch]);

    const changeFilter = useCallback((value: FiltersValueType, todoListId: string) => {
        dispatch(changeFilterTodolistAC(todoListId, value))
    }, [dispatch]);
    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodolistAC(todoListId))
    },[dispatch]);
    const changeTodoListTitle = useCallback((todolistId:string, title:string) =>{
        dispatch(changeTodolistTitleAC(todolistId, title))
    },[dispatch]);

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todoLists.map(tl => {
                return (
                    <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksObj[tl.id]}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                        changTaskTitle={changTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                    // <MyTodoList todolist={tl}/>
                )
            })}

        </div>
    );
}

export default AppWithRedux;

