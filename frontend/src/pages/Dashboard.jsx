import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom';

import TaskComponent from '../components/TaskComponent';

import '../styling/Dashboard.scss'

const Dashboard = () => {
    
const [ taskData, setTaskData ] = useState( useLoaderData() );

  return (
    <>

        <div class="dashboard-container">
            <div class="controls">
                <div class="add-btn-container">
                    <button
                        class="add-task"
                        onClick={"modalToggle"}
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
        </div>
    </>
  )
}

export default Dashboard