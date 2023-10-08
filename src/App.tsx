import React, {useState} from "react";
import "./App.css";
import {v1} from "uuid";
import {TaskType, TodoList} from "./components/TodoList";
import {AddItemForm} from "./components/AddItemForm";

export type FiltersValueType = "All" | "Active" | "Completed";

export type TodoListsType = {
    id: string
    title: string
    filter: FiltersValueType
}

export type TaskStateType = {
    [key: string]:TaskType[]
}


function App() {

    const addTask = (title: string, todoListId: string) => {
        const task = {id: v1(), title: title, isDone: false}
        let tasks = tasksObj[todoListId];
        tasksObj[todoListId] = [task, ...tasks]
        setTasks({...tasksObj})
    }
    const removeTask = (id: string, todoListId: string) => {
        let tasks = tasksObj[todoListId]
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todoListId] = filteredTasks
        setTasks({...tasksObj})
    }


    const changeFilter = (value: FiltersValueType, todoListId: string) => {
        let todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value;
            setTodoList([...todoLists])
        }
    }

    const changeStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        let tasks = tasksObj[todoListId]

        let task = tasks.find(t => taskId === t.id)
        if (task) {
            task.isDone = isDone
        }
        setTasks({...tasksObj})

    }

    let todoListId1 = v1();
    let todoListId2 = v1();


    let removeTodoList = (todoListId: string) => {
        let filteredTodoList = todoLists.filter(tl => tl.id !== todoListId)
        setTodoList(filteredTodoList)
        delete tasksObj[todoListId]
        setTasks({...tasksObj})
    }

    let [todoLists, setTodoList] = useState<Array<TodoListsType>>([
        {id: todoListId1, title: "What to learn", filter: "All"},
        {id: todoListId2, title: "What to buy", filter: "Active"}
    ])

    const [tasksObj, setTasks] = useState<TaskStateType>({
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

    const addTodolist = (title:string) =>{
        const newTodo:TodoListsType = {id: v1(), title, filter: "All"}
        setTodoList( [newTodo, ...todoLists])
        setTasks({[newTodo.id]: [], ...tasksObj})
    }

    const changTaskTitle = (todolistId:string, taskId:string, title:string)=>{
        setTasks({...tasksObj, [todolistId]:tasksObj[todolistId].map(el=>el.id===taskId? {...el, title}:el)})
    }
    const changeTodoListTitle = (todolistId:string, title:string) =>{
        setTodoList(todoLists.map(el=>el.id===todolistId? {...el, title}:el))
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
                        filtered={tl.filter}
                        removeTodoList={removeTodoList}
                        changTaskTitle={changTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                )
            })}

        </div>
    );
}

export default App;

