import React from 'react';
import './todoItem.css'

function TodoItemComponent(props) {

    return (<div className='todoItem'
                 draggable='true'
                 onDragStart={props.funObj.dragDivHandler}
                 onDrop={props.funObj.dropDivHandler}
                 onDragOver={props.funObj.dragOverDivHandler}>
        <input type='checkbox'
               className='todoItem__checkbox'
               onChange={props.funObj.changeCheckboxHandler}
               checked={props.funObj.isCompleted}/>
        <label
            contentEditable={props.funObj.isContentEditable}
            className={props.funObj.isCompleted ? 'todoItem__text todoItem__text-completed' : 'todoItem__text'}
            ref={props.funObj.textRef}
            suppressContentEditableWarning={props.funObj.isContentEditable}>{props.task.title}</label>
        <button
            onClick={props.funObj.confirmEditClickHandler}
            className='todoItem__btn todoItem__btn-edit'
            hidden={props.funObj.isContentEditable ? null : 'hidden'}>&#10004;</button>
        <button
            onClick={props.funObj.editClickHandler}
            className='todoItem__btn todoItem__btn-edit'
            hidden={props.funObj.isContentEditable ? 'hidden' : null}>&#9998;</button>
        <button
            onClick={props.funObj.removeClickHandler}
            className='todoItem__btn todoItem__btn-remove'>&#10006;</button>
    </div>);
}

export default TodoItemComponent;