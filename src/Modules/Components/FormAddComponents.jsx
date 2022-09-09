import React, { useState, useContext, useMemo } from 'react'
import '../Css/Component.css'
import 'antd/dist/antd.css';
import { Button, Input, Row, Col, message, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Context } from '../ContextAPI/store';
import { addData } from '../ContextAPI/actions'
import { validateForm, validForm } from '../ultils/validate';

const FormAddComponent = () => {
    const key = 'updatable';
    const { Text } = Typography;
    const [formValue, setFormValue] = useState({ name: '', des: '', checked: false })
    const [validateValues, setValidateValues] = useState({});
    const [loading, setLoading] = useState(false)
    const [state, dispatch] = useContext(Context);

    const arr = useMemo(() => {
        let todoList = localStorage.getItem('todoList');
        let arr = JSON.parse(todoList);
        return arr;
    }, [state])
    const handleAddItem = () => {
        const validateValues = validateForm(formValue)
        setValidateValues(validateValues)
        if (!validForm(validateValues)) {
            return;
        }
        // Add to globalstate, add localstorerage
        message.loading({
            content: 'Addding...',
            key,
          },100);
        setLoading(true)
        setTimeout(() => {
            let lastID = 0;
            if (arr && arr.length > 0) {
                lastID = arr[arr.length - 1].id
            }
            arr.push({ ...formValue, id: lastID + 1 })
            localStorage.setItem('todoList', JSON.stringify(arr)) //add localstorage
            dispatch({ type: addData, payload: { ...formValue, id: lastID + 1 } }) //add to global state
            message.success({
                content : 'Adding success',
                key,
            });
            setLoading(false)
            setFormValue(prevForm => {
                return {
                    ...prevForm,
                    name: '',
                    des: '',
                }
            })
            setValidateValues({})
        }, 1000)
    }
    return (
        <div className='form-add-container'>
            <Row>
                <Col span={10} offset={6}>
                    <div className='form-container'>
                        <div className='input-wrapper'>
                            <Input placeholder='Name' size='large' value={formValue.name}
                                onChange={(e) => {
                                    setFormValue((prevForm) => {
                                        return {
                                            ...prevForm,
                                            name: e.target.value
                                        }
                                    })
                                }} />
                            {validateValues && <Text type="danger">{validateValues.nameErr}</Text>}
                        </div>
                        <div className='input-wrapper'>
                            <Input placeholder='Description' size='large' value={formValue.des}
                                onChange={(e) => {
                                    setFormValue((prevForm) => {
                                        return {
                                            ...prevForm,
                                            des: e.target.value
                                        }
                                    })
                                }} />
                            {validateValues && <Text type="danger">{validateValues.desErr}</Text>}
                        </div>
                    </div>
                </Col>
                <Col span={2}>
                    <div className='btn-submit-form'>
                        <Button onClick={handleAddItem} type='danger' icon={<PlusOutlined />} loading={loading}>Add new item</Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default FormAddComponent;