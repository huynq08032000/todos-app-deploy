import React, { useContext, useEffect } from 'react'
import TabsComponent from './TabsComponent';
import '../Css/Component.css'
import FormAddComponent from './FormAddComponents';
import { setData } from '../ContextAPI/actions';
import { Context } from "../ContextAPI/store";
const TodoComponent = () => {
    const [state, dispatch] = useContext(Context);
    useEffect(() => {
        let todoList = localStorage.getItem('todoList');
        if (todoList){ 
            let arr = JSON.parse(todoList)
            dispatch({type : setData, payload : arr})
        } else {
            localStorage.setItem('todoList', JSON.stringify([]))
        }
    }, [])
    return (
        <div>
            <div className='header-title'>
                Todo App
            </div>
            <FormAddComponent />
            <TabsComponent />
        </div>
    )
}
export default TodoComponent;