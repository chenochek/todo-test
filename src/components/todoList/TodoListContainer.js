import React, {useEffect, useState} from 'react';

import TodoItemContainer from "../todoItem/TodoItemContainer.js";
import TodoListComponent from './TodoListComponent.js'


function TodoListContainer() {
    const USER_ID = 1,
        URL = 'https://jsonplaceholder.typicode.com/todos';
    let [dataArr, setDataItem] = useState([]),
        [listElements, setListElement] = useState([]),
        [dragEl, setDragEl] = useState({})


    //lifecycle methods

    useEffect(async () => {
        const response = await fetch(
            `${URL}?userId=${USER_ID}`
        );
        let jsonData = await response.json();
        setDataItem(jsonData)
    }, [])

    useEffect(() => {
        setListElement(() => dataArr.map((element) => <TodoItemContainer
            key={element.id}
            task={element}
            onChangeClickHandler={onChangeClickHandler}
            onConfirmEditClickHandler={onConfirmEditClickHandler}
            onRemoveClickHandler={onRemoveClickHandler}
            onDragDivHandler={onDragDivHandler}
            onDropDivHandler={onDropDivHandler}>
        </TodoItemContainer>))

    }, [dataArr]);


    //handlers


    function onRemoveClickHandler(id) {
        let removeIndex = dataArr.findIndex((element) => element.id === id);
        setDataItem(() => {
            return [
                ...dataArr.slice(0, removeIndex),
                ...dataArr.slice(removeIndex + 1)
            ];
        });

        fetch(`${URL}/${id}`, {
            method: 'DELETE',
        });
    }

    function onChangeClickHandler(id, completeStatus) {
        setDataItem(() => {
            return dataArr.map(todo => {
                if (todo.id === id) {
                    todo.completed = completeStatus
                }
                return todo;
            })
        })

        const body = {
            userId: USER_ID,
            completed: completeStatus,
            title: dataArr.find(el => el.id === id)['title'],
            id: id
        };
        getData('PUT', 'body')
    }

    function onConfirmEditClickHandler(id, newTitle) {
        setDataItem(() => {
            return dataArr.map(todo => {
                if (todo.id === id) {
                    todo.title = newTitle
                }
                return todo;
            })
        })

        const body = {
            userId: USER_ID,
            completed: dataArr.find(el => el.id === id)['completed'],
            title: newTitle,
            id: id
        };

        getData('PUT', body)
    }

    async function onConfirmAddClickHandler(title) {
        const body = {
                userId: USER_ID,
                completed: false,
                title: title
            };
        const newItem = await getData('POST', body)
        //this is necessary, because public Api return the same id for new items
        newItem['id'] = newItem['id'] + Math.floor(Math.random() * (100 - 5 + 1)) + 5;
        setDataItem(() => [newItem, ...dataArr])
    }

    function onDragDivHandler(id) {
        let dragIndex = dataArr.findIndex((element) => element.id === id);
        setDragEl(() => {
            dragEl =  dataArr[dragIndex]
        });
    }

    function onDropDivHandler(id) {
        const dragInd = dataArr.findIndex(el =>dragEl['id'] === el['id']),
            arrWithoutDragging = [
                 ...dataArr.slice(0, dragInd),
                 ...dataArr.slice(dragInd + 1)
             ],
            dropIndex= arrWithoutDragging.findIndex(element => element.id === id);
        setDataItem(() => {
            return dropIndex === -1 ?
             [
                dragEl,
                ...arrWithoutDragging
            ] :
             [
                ...arrWithoutDragging.slice(0, dropIndex),
                dragEl,
                ...arrWithoutDragging.slice(dropIndex)
            ];
        });
        setDragEl({});
    }


    //other function
    async function getData(method, body) {
         async function fetching() {
            const response = await fetch(URL,
                {
                    method: method,
                    body: JSON.stringify(body),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },

                }),
                jsonData = await response.json();
            return jsonData;
        }


       return  await fetching().then(data => data)

    }

    return (
        <TodoListComponent listElements={listElements}
                           onConfirmAddClickHandler={onConfirmAddClickHandler}
        />
    );
}


export default TodoListContainer;