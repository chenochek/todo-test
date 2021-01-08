import React, {useEffect, useState} from 'react';
import AddItemContainer from '../addItem/AddItemContainer.js'

function TodoListComponent(props) {

    return (
        <div>
            <AddItemContainer onConfirmAddClickHandler={props.onConfirmAddClickHandler}/>
            <div>
                {props.listElements}
            </div>
        </div>

    );
}


export default TodoListComponent;