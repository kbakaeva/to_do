import React from 'react';
import EditSVG from '../assets/edit.svg';
import DeleteSVG from '../assets/delete.svg';
import DoneSVG from '../assets/done.svg';
import '../App.css';

const deadLine = new Date(2022, 10, 29);

const ToDoList = ({ tasks, markDone, setTodo, deleteTask, setSelectedTodoId }) => {
    return (
        <>
            <div className='content'>
                <div className='unfulfilled'>
                    <p className='title bold_title'>#</p>
                    <p className='title bold_title'>Заголовок</p>
                    <p className='title bold_title'>Описание</p>
                    <p className='title bold_title'>Дата истечения</p>
                    <p className='title bold_title'>Файл</p>
                </div>
                <div style={{ display: 'flex', width: '140px' }}>
                    <p style={{ width: '20px' }}>---|</p>
                    <p style={{ width: '20px' }}>---|</p>
                    <p style={{ width: '20px' }}>---</p>
                </div>
            </div>

            {tasks.length === 0 ? 'No Tasks...' :
                tasks.sort((a, b) => a.id > b.id ? 1 : -1)
                    .map((task, index) => {
                        const date = new Date(task.date)
                        return (
                            <React.Fragment key={task.id}>
                                <div className='content'>
                                    <div className={task.status || date <= deadLine ? 'done' : 'unfulfilled'}>
                                        <p className='title'>{index + 1}</p>
                                        <p className='title'>{task.title}</p>
                                        <p className='title'>{task.description}</p>
                                        <p className='title'>{task.date}</p>
                                        <p className='title'>{task.file}</p>
                                    </div>
                                    <div className='icons'>
                                        <span title='Completed / Not Completed'
                                            onClick={(e) => { markDone(task.id) }}>
                                            <img
                                                width='20px'
                                                height='20px'
                                                src={DoneSVG}
                                                alt='done'
                                            />
                                        </span>
                                        {task.status ? null : (
                                            <span title='Edit'
                                                onClick={() => {
                                                    setTodo(task)
                                                    setSelectedTodoId(task.id)
                                                }}>
                                                <img
                                                    width='20px'
                                                    height='20px'
                                                    src={EditSVG}
                                                    alt='edit'
                                                />
                                            </span>
                                        )}
                                        <span title='Delete'
                                            onClick={() => deleteTask(task.id)}>
                                            <img
                                                width='20px'
                                                height='20px'
                                                src={DeleteSVG}
                                                alt='delete'
                                            />
                                        </span>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    })}
        </>
    )
}

export default ToDoList;