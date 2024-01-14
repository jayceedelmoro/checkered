import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import { useLoaderData, useRevalidator } from 'react-router-dom';

import '../styling/TaskComponent.scss'

const TaskComponent = ({ title }) => {
    const taskData = useLoaderData();

    const [render, rerender] = useState(true);

    const completed = title == 'Completed' ? true : false;

    const [ taskList, setTaskList ] = useState( taskData.data.message.filter((list) => list.isCompleted == completed));

    const checkToggle = taskId => event => {
        axios.put(`${ process.env.REACT_APP_SITE_LINK }/api/v1/tasks/${ taskId }`, {'isCompleted': event.target.checked }).then(() => {

            rerender(!render)
            toast.success('Task Updated', {
                autoClose: 1000,
            });
        });
    }

    useEffect(() => {
        axios.get(`${ process.env.REACT_APP_SITE_LINK }/api/v1/tasks/`).then((dbResponse) => {
            setTaskList(dbResponse.data.message.filter((list) => list.isCompleted == completed));
        });
    }, [render])

  return (
    <div className="task-component">
        <div className='title'>
            <h3>
                { title }
            </h3>
        </div>

        <div className='task-list'>
            <div className="tasks">
                {
                    taskList.map( task => {
                        return(
                            <>
                                <input
                                    key={ task._id }
                                    type="checkbox"
                                    checked={ task.isCompleted }
                                    onChange={ checkToggle(task._id) }
                                />
                                <p> { task.name } </p>
                                <p> { task.description } </p>
                                <button className="edit-btn"> Edit </button>
                            </>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default TaskComponent