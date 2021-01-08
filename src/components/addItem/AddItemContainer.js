import React, {useState} from 'react'
import AddItemComponent from './AddItemComponent.js'

function AddItemContainer(props) {

    const  [textTodo, setTextTodo] = useState("")


    function  confirmAddClickHandler() {
        if(textTodo){
           props.onConfirmAddClickHandler(textTodo)
        }
        setTextTodo("")
    }

    function changeTextareaHandler(e) {
        const {value} = e.target
        setTextTodo(() => value)
    }

    const funObj = {
        confirmAddClickHandler: confirmAddClickHandler,
        changeTextareaHandler: changeTextareaHandler,
        textTodo: textTodo
    }

    return (
       <AddItemComponent funObj={funObj}/>
    )
}

export default AddItemContainer