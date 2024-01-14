import React from 'react'
import axios from 'axios';

import { CloseCircleOutline } from '@ricons/ionicons5';
import { Icon } from '@ricons/utils'

import '../styling/ModalComponent.scss'

const ModalComponent = (props) => {

    const hideModal = (event) => {
        let modalContainer = document.querySelector('.modal-container');
        let modalClose = document.querySelector('.modal-close');
        
        if (modalContainer !== undefined) {
            if (!modalContainer.contains(event.target) || modalClose.contains(event.target)){
                props.modalToggle();
            }
        }
    }

  return (
    <div class="modal-overlay" onClick={ hideModal }>
        <div class="modal-container">
            <div className='modal-close' onClick={ hideModal }>
                <Icon>
                    <CloseCircleOutline />
                </Icon>
            </div>
        </div>
    </div>
  )
}

export default ModalComponent