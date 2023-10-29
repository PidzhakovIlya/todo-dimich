import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm: React.FC<AddItemFormPropsType> = memo((props) => {
    console.log("Add item Form")
    const [newTitle, setNewTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    const addItem = () => {
        if (newTitle.trim() !== "") {
            props.addItem(newTitle.trim())
            setNewTitle("")
        } else {
            setError("Field is requred")
        }
    }
    const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error !== null){
        setError(null)
        }
        if (e.key === "Enter") {
            addItem()
        }
    }
    const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    return (
        <div>
            <input value={newTitle}
                   onChange={inputOnChangeHandler}
                   onKeyDown={keyDownHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addItem}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>)
})