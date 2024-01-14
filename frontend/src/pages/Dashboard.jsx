import React from 'react'
import { useLoaderData } from 'react-router-dom';

import TaskComponent from '../components/TaskComponent';

import '../styling/Dashboard.scss'

const Dashboard = () => {
    
const taskData = useLoaderData();

  return (
    <>

        <div class="dashboard-container">
            <div class="controls">
                <div class="add-btn-container">
                    <button
                        class="add-task"
                        onClick="modalToggle"
                    >
                        Add Task
                    </button>
                </div>
            </div>

            {/* In Progress Tasks */}
            <TaskComponent title = 'In Progress'/>

            {/* Completed */}
            <TaskComponent title = 'Completed'/>
        </div>
    </>
  )
}

export default Dashboard