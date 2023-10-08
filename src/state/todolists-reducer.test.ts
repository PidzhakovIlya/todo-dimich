import {v1} from "uuid";
import {FiltersValueType, TodoListsType} from "../App";
import {
    addTodolistsAC,
    changeFilterTodolistAC,
    changeTodolistTitleAC,
    removeTodolistsAC,
    todolistsReducer
} from "./todolistsReducers";


test("correct todolist should be removed", ()=>{
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodoListsType> = [
        {id:todolistId1, title: "What to learn", filter: "All"},
        {id:todolistId2, title: "What to buy", filter: "All"}
    ]
    const endState = todolistsReducer(startState, removeTodolistsAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);

})

test("correct todolist should be added", ()=>{
    let todolistId1 = v1()
    let todolistId2 = v1()

    const newTitle = "New Todolist"

    const startState: Array<TodoListsType> = [
        {id:todolistId1, title: "What to learn", filter: "All"},
        {id:todolistId2, title: "What to buy", filter: "All"}
    ]
    const endState = todolistsReducer(startState, addTodolistsAC(newTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTitle);
    expect(endState[2].filter).toBe("All");

})

test('correct todolist should change its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: Array<TodoListsType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]

    const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTodolistTitle
    }

    const endState = todolistsReducer(startState, changeTodolistTitleAC(newTodolistTitle, todolistId2 ))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newFilter: FiltersValueType = 'Completed'

    const startState: Array<TodoListsType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]

    const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter
    }

    const endState = todolistsReducer(startState, changeFilterTodolistAC(todolistId2, newFilter))

    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe(newFilter)
})