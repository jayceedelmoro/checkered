import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

import { CloseCircleOutline } from '@ricons/ionicons5';
import { Icon } from '@ricons/utils'

import '../styling/ModalComponent.scss'

const ModalComponent = (props) => {

    const [ state, setState ] = useState({});
    const { value } = state;

    //general function to change value of inputs
    const changeText = (e) => {
      const { name, value } = e.target;
  
      setState({
        ...state,
        [name]: value
      });
    }

    const hideModal = (event) => {
        let modalContainer = document.querySelector('.modal-container');
        let modalClose = document.querySelector('.modal-close');
        
        if (modalContainer !== undefined) {
            if (!modalContainer.contains(event.target) || modalClose.contains(event.target)){
                props.modalToggle();
            }
        }
    }

    const refreshTaskList = () => {

    }

    const actionHandler = (e) => {
        e.preventDefault();

        const userId = localStorage.getItem('userId');
        
        const loading = toast.loading("Please wait...");

        if(state.taskName && state.description) {
            const actionEndpoint = props.taskId
            ? axios.put(`${ process.env.REACT_APP_SITE_LINK }/api/v1/tasks/${ props.taskId }`, {name: state.taskName, description: state.description})
            : axios.post(`${ process.env.REACT_APP_SITE_LINK }/api/v1/tasks/add`, {name: state.taskName, description: state.description, ownerId: userId })
            
            actionEndpoint.then((dbResponse) => {
            
                // Refresh the Task Data on the Dashboard
                axios.get(`${ process.env.REACT_APP_SITE_LINK }/api/v1/tasks/user/${ userId }`).then((dbResponse) => {
                    props.setTaskData(dbResponse);
                });

                toast.update(
                    loading, {
                        render: dbResponse.data.message,
                        type: "success",
                        isLoading: false,
                        autoClose: 1000,
                    }
                );

                props.modalToggle();
            })
            .catch(error => {
                toast.update(
                    loading, {
                        render: error.response.data.message,
                        type: "error",
                        isLoading: false,
                        autoClose: 1000,
                    }
                );
            })
        }
        else {
            toast.update(
                loading, {
                    render: 'All fields required',
                    type: "error",
                    isLoading: false,
                    autoClose: 1000,
                }
            );
        }
    }
    
    useEffect(() => {
        if(props.taskId) {
            axios.get(`${ process.env.REACT_APP_SITE_LINK }/api/v1/tasks/${ props.taskId }`).then((dbResponse) => {

                setState({
                    ...state,
                    taskName: dbResponse.data.message.name,
                    description: dbResponse.data.message.description
                });
            });
        }
    }, [])

  return (
    <div class="modal-overlay" onClick={ hideModal }>
        <div class="modal-container">
            <div className='modal-close' onClick={ hideModal }>
                <Icon>
                    <CloseCircleOutline />
                </Icon>
            </div>

            <div className="main-container">
                <h2> { props.title } </h2>
                <form>
                    <input
                        type = 'text'
                        name='taskName'
                        value={ state.taskName }
                        placeholder="Task Name"
                        onChange={ changeText }
                    />

                    <textarea
                        type = 'text'
                        name='description'
                        value={ state.description }
                        placeholder="Please Add Description"
                        onChange={ changeText }
                    />
                    
                    <div className="btn-container">
                        <button
                            type='button'
                            className='cancel-btn'
                            onClick={ props.modalToggle }
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            onClick={ actionHandler }
                        >
                            { props.action }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ModalComponent