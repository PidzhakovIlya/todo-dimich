import React, {ChangeEvent, useState, memo} from "react";

type EditableSpanType = {
    title: string
    onChange:(title: string)=>void
}
export const EditableSpan: React.FC<EditableSpanType> = memo((props) => {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState("");
    const activateEditMode = ()=>{
        setEditMode(true)
        setTitle(props.title)

    }
    const activateViewMod = ()=>{
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) =>{
        setTitle(e.currentTarget.value)

    }
    return (
        editMode ?
            <input value={title} onChange={onChangeTitle} onBlur={activateViewMod} autoFocus />
            : <span onDoubleClick={activateEditMode} >{props.title}</span>
    )
})