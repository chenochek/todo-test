import React, {useState} from 'react'

function AddItemComponent(props) {

    return (
        <div className='todoItem'>
                <textarea
                    className='todoItem__text todoItem__text-active'
                    value={props.funObj.textTodo}
                    onChange={props.funObj.changeTextareaHandler}></textarea>
            <button
                onClick={props.funObj.confirmAddClickHandler}
                className='todoItem__btn todoItem__btn-edit'>&#10004;</button>
        </div>
    )
}

export default AddItemComponent