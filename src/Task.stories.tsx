import {Meta, StoryObj} from "@storybook/react";
import {Task} from "./Task";
import {action} from "@storybook/addon-actions";
import {v1} from "uuid";

const meta: Meta<typeof Task> = {
        title: "TODOLOISTS/Task",
        component: Task,
        parameters: {
            // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
            layout: "centered",
        },
        // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
        tags: ["autodocs"],
        // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
        argTypes: {
            changTaskTitle: {
                action: "changeTaskTitle"
            },
            changeTaskStatus: {
                action: "changeTaskStatus"
            },
            removeTask: {
                description: "RemoveTask",
                action:
                    "Task Removed"
            }
        },
        args: {
            task: {id: "54casca", title: "Hello", isDone: false},
            todolistId: v1()
        }
    }
;

export default meta

type Story = StoryObj<typeof Task>

export const TaskFalseExample: Story = {}


export const TaskTrueExample: Story = {
    args:{
        task: {id: "54casca", title: "Hello", isDone: true},
    }
}