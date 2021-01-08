import React, {useRef, useState} from 'react'
import TodoItemComponent from './TodoItemComponent.js'

function TodoItemContainer(props) {

    const [isCompleted, setCompletion] = useState(props.task.completed),
        [isContentEditable, setContentEditable] = useState(false),
        textRef = useRef(null),


        changeCheckboxHandler = (e) => {
            setCompletion(!isCompleted)
            props.onChangeClickHandler(props.task.id, isCompleted);
        },

        removeClickHandler = () => {
            props.onRemoveClickHandler(props.task.id)
        },

        editClickHandler = (e) => {
            e.target.blur();
            setContentEditable(true)
            textRef.current.focus()
            textRef.current.className += ' todoItem__text-active'
        },

        confirmEditClickHandler = (e) => {
            setContentEditable(false)
            const currentClass = textRef.current.className;
            textRef.current.className = currentClass.split('todoItem__text-active')[0]
            props.onConfirmEditClickHandler(props.task.id, textRef.current.innerHTML)
        },

        dragDivHandler = (e) => {
            props.onDragDivHandler(props.task.id)
        },

        dropDivHandler = (e) => {
            e.preventDefault();
            props.onDropDivHandler(props.task.id)
        },

        dragOverDivHandler = (e) => {
            e.preventDefault()
        },

        funObj = {
            changeCheckboxHandler: changeCheckboxHandler,
            isCompleted: isCompleted,
            isContentEditable: isContentEditable,
            textRef: textRef,
            confirmEditClickHandler: confirmEditClickHandler,
            removeClickHandler: removeClickHandler,
            editClickHandler: editClickHandler,
            dragDivHandler: dragDivHandler,
            dropDivHandler: dropDivHandler,
            dragOverDivHandler: dragOverDivHandler,
        }

    return (
        <TodoItemComponent task={props.task} funObj={funObj}/>
    )
}

export default TodoItemContainer