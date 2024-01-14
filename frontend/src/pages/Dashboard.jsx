import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom';

import TaskComponent from '../components/TaskComponent';
import ModalComponent from '../components/ModalComponent';

import '../styling/Dashboard.scss'

const Dashboard = () => {
    
const [ taskData, setTaskData ] = useState( useLoaderData() );

const [ isModalOpen, setIsModelOpen] = useState(false);

const modalToggle = () => {
    setIsModelOpen(!isModalOpen);
}

  return (
    <>

        <div class="dashboard-container">
            <div class="controls">
                <div class="add-btn-container">
                    <button
                        class="add-task"
                        onClick={ modalToggle }
                    >
                        Add Task
                    </button>
                </div>
            </div>

            {/* In Progress Tasks */}
            <TaskComponent
                title = 'In Progress'
                taskData = { taskData }
                setTaskData = { setTaskData }
            />

            {/* Completed */}
            <TaskComponent
                title = 'Completed'
                taskData = { taskData }
                setTaskData = { setTaskData }
            />
            
            {
                isModalOpen
                ? <ModalComponent modalToggle = { modalToggle }/>
                : null
            }
        </div>
    </>
  )
}

export default Dashboard