import {Meta, StoryObj} from "@storybook/react";
import AppWithRedux from "./AppWithRedux";
import {ReduxStoreProviderDecorator} from "./state/ReduxProviderDecorator";

const meta: Meta<typeof AppWithRedux> = {
    title: "TODOLIST/AppWithRedux",
    component:AppWithRedux,
    parameters: {
        layout: "center"
    },
    tags:["autodocs"],

   decorators:[ReduxStoreProviderDecorator]
}

export default meta

type Story = StoryObj<typeof AppWithRedux>

export const AppWithReduxExample: Story = {}