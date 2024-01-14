import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom';

import TaskComponent from '../components/TaskComponent';
import ModalComponent from '../components/ModalComponent';

import '../styling/Dashboard.scss'

const Dashboard = () => {
    
const [ taskData, setTaskData ] = useState( useLoaderData() );

const [ isModalOpen, setIsModelOpen] = useState(false);
const [ action, setAction] = useState('');
const [ actionTitle, setActionTitle] = useState('');
const [ taskId, setTaskId] = useState('');

const modalToggle = () => {
    setIsModelOpen(!isModalOpen);
}

const setDataModal = (action, actionTitle, taskId) => event => {
        setAction(action);
        setActionTitle(actionTitle);
        setTaskId(taskId);
        modalToggle()
}

  return (
    <>

        <div class="dashboard-container">
            <div class="controls">
                <div class="add-btn-container">
                    <button
                        class="add-task"
                        onClick={ setDataModal('Add', 'Add Task') }
                    >
                        Add Task
                    </button>
                </div>
            </div>

            {/* In Progress Tasks */}
            <TaskComponent
                title = 'In Progress'
                taskData = { taskData }
                setDataModal = { setDataModal }
                setTaskData = { setTaskData }
            />

            {/* Completed */}
            <TaskComponent
                title = 'Completed'
                taskData = { taskData }
                setDataModal = { setDataModal }
                setTaskData = { setTaskData }
            />
            
            {
                isModalOpen
                ? <ModalComponent 
                    modalToggle = { modalToggle }
                    title = { actionTitle }
                    action = { action }
                    taskId = { taskId }
                  />
                : null
            }
        </div>
    </>
  )
}

export default Dashboard