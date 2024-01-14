import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import '../styling/TaskComponent.scss'

const TaskComponent = ({ title, taskData, setTaskData,setDataModal }) => {

    // Condition to check if the task is completed or not
    const completed = title == 'Completed' ? true : false;

    // Filter the tasks
    const [ taskList, setTaskList ] = useState( taskData.data.message.filter((list) => list.isCompleted == completed));

    const checkToggle = taskId => event => {
        axios.put(`${ process.env.REACT_APP_SITE_LINK }/api/v1/tasks/${ taskId }`, {'isCompleted': event.target.checked }).then(() => {
            
            // Refresh the Task Data on the Dashboard
            axios.get(`${ process.env.REACT_APP_SITE_LINK }/api/v1/tasks/user/${ localStorage.getItem('userId') }`).then((dbResponse) => {
                setTaskData(dbResponse);
            });

            toast.success('Task Updated', {
                autoClose: 1000,
            });
        });
    }

    // Refresh the Task Data on the Component
    useEffect(() => {
        setTaskList(taskData.data.message.filter((list) => list.isCompleted == completed))
    }, [taskData])

  return (
    <div className="task-component">
        <div className='title'>
            <h3>
                { title }
            </h3>
        </div>

        <div className='task-list'>
            <div className="task-header">
                <h4 className='title'> Title </h4>
                <h4> Description </h4>
            </div>
            <div className="tasks">

                {
                    taskList.map( task => {
                        return(
                            <div className='list'>
                                <input
                                    key={ task._id }
                                    type="checkbox"
                                    checked={ task.isCompleted }
                                    onChange={ checkToggle(task._id) }
                                />
                                <p> { task.name } </p>
                                <p> { task.description } </p>

                                {
                                    task.isCompleted
                                    ? null
                                    : <button
                                    className="edit-btn"
                                    onClick={ setDataModal('Edit', 'Edit Task', task._id) }
                                    >
                                        Edit
                                    </button>
                                }
                                <button
                                    className="delete-btn"
                                    onClick={ setDataModal('Delete', 'Delete Task', task._id) }
                                >
                                    Delete
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default TaskComponent