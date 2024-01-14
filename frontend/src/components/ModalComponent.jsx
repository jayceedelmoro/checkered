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
    
    useEffect(() => {
        if(props.taskId) {
            axios.put(`${ process.env.REACT_APP_SITE_LINK }/api/v1/tasks/${ props.taskId }`).then((dbResponse) => {

                setState({
                    ...state,
                    taskName: dbResponse.data.message.taskName,
                    description: dbResponse.data.message.description
                });

                console.log(state)
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
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
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