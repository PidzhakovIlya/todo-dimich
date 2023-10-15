import {v1} from "uuid";
import {addTaskAC, changeStatusTaskAC, changeTitleTaskAC, removeTaskAC, tasksReducer} from "./tasksReducers";
import {addTodolistsAC, removeTodolistAC} from "./todolistsReducers";
import {TaskStateType} from "../App";


test("correct task should be added", () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let newTitle = "Angular"
    const initialStateTasks = {
        [todolistId1]: [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "ReactJS", isDone: false},
            {id: "4", title: "Rest API", isDone: false},
            {id: "5", title: "GraphQL", isDone: false},],
        [todolistId2]: [
            {id: "1", title: "Milk", isDone: true},
            {id: "2", title: "Book", isDone: true},
        ]
    }
    const endState = tasksReducer(initialStateTasks, addTaskAC(todolistId1, newTitle))

    expect(endState[todolistId1].length).toBe(6);
    expect(initialStateTasks[todolistId1].length).toBe(5);
    expect(endState[todolistId2].length).toBe(2);
    expect(endState[todolistId1][0].title).toBe(newTitle);
})


test("correct task should be removed", () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const initialStateTasks = {
        [todolistId1]: [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "ReactJS", isDone: false},
            {id: "4", title: "Rest API", isDone: false},
            {id: "5", title: "GraphQL", isDone: false},],
        [todolistId2]: [
            {id: "1", title: "Milk", isDone: true},
            {id: "2", title: "Book", isDone: true},
        ]
    }
    const endState = tasksReducer(initialStateTasks, removeTaskAC("1", todolistId1))

    expect(endState[todolistId1].length).toBe(4);
    expect(initialStateTasks[todolistId1].length).toBe(5);
    expect(endState[todolistId1][0].title).toBe("JS");
    expect(endState[todolistId2].length).toBe(2);
    expect(endState[todolistId1].every(t=>t.id !== '1')).toBeTruthy();

})

test("status task should be changed", () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const initialStateTasks = {
        [todolistId1]: [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "ReactJS", isDone: false},
            {id: "4", title: "Rest API", isDone: false},
            {id: "5", title: "GraphQL", isDone: false},],
        [todolistId2]: [
            {id: "1", title: "Milk", isDone: true},
            {id: "2", title: "Book", isDone: true},
        ]
    }
    const endState = tasksReducer(initialStateTasks, changeStatusTaskAC(todolistId1, "3", true))
    expect(endState[todolistId1][2].isDone).toBeTruthy();
    expect(initialStateTasks[todolistId1][2].isDone).toBeFalsy();
    expect(endState[todolistId2][1].isDone).toBeTruthy();
})

test("title task should be changed", () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTitle = "Bread"

    const initialStateTasks = {
        [todolistId1]: [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "ReactJS", isDone: false},
            {id: "4", title: "Rest API", isDone: false},
            {id: "5", title: "GraphQL", isDone: false},],
        [todolistId2]: [
            {id: "1", title: "Milk", isDone: true},
            {id: "2", title: "Book", isDone: true},
        ]
    }
    const endState = tasksReducer(initialStateTasks, changeTitleTaskAC(todolistId1, "2", newTitle))
    expect(endState[todolistId1][1].title).toBe(newTitle);
    expect(endState[todolistId2][1].title).toBe("Book");
})

test("new property with new array should be added when new todolist is added", () => {
    let todolistId1 = v1()
    let todolistId2 = v1()


    const initialStateTasks:TaskStateType = {
        [todolistId1]: [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "ReactJS", isDone: false},
            {id: "4", title: "Rest API", isDone: false},
            {id: "5", title: "GraphQL", isDone: false},],
        [todolistId2]: [
            {id: "1", title: "Milk", isDone: true},
            {id: "2", title: "Book", isDone: true},
        ]
    }
    const action = addTodolistsAC("New todolist")

    const endState = tasksReducer(initialStateTasks, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k=>k !== todolistId1 && k !== todolistId2 );
    if(!newKey){
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const startState: TaskStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})

