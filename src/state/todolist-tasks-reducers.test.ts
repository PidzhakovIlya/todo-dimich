import {TaskStateType, TodoListsType} from "../App";
import {addTodolistsAC, todolistsReducer} from "./todolistsReducers";
import {tasksReducer} from "./tasksReducers";

test("id should be equals", ()=>{
    const startTasksState: TaskStateType = {};
    const startTodolistState: TodoListsType[] = [];

    const action = addTodolistsAC("New Todolist");
    const endTaskState = tasksReducer(startTasksState, action);
    const endTodoloistsState  = todolistsReducer(startTodolistState, action);

    const keys = Object.keys(endTaskState);
    const idFromTask = keys[0];
    const idFromTodolists = endTodoloistsState[0].id;

    expect(idFromTask).toBe(action.payload.id);
    expect(idFromTodolists).toBe(action.payload.id)
})