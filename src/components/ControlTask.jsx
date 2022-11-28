import '../App.css';

const ControlTask = ({ createTask, handleChange, todo, updateTodo, selectedTodoId, cancelUpdate }) => {
    return (
        <>
            <div className="addFields">
                <input
                    value={todo?.title}
                    placeholder='Заголовок'
                    onChange={(event) => {
                        handleChange('title', event.target.value)
                    }} />
                <input
                    value={todo?.description}
                    placeholder='Описание'
                    onChange={(event) => {
                        handleChange('description', event.target.value)
                    }} />
                <input
                    value={todo?.date}
                    type='date'
                    placeholder='Дата завершения'
                    onChange={(event) => {
                        handleChange('date', event.target.value)
                    }}
                />
                <label className='label'>
                    {!todo.file ?
                        <p>Прикрепить файл</p>
                        :
                        <>
                            <span>{todo.file}</span>
                            <p>✕</p>
                        </>
                    }
                    <input
                        type='file'
                        placeholder=''
                        className='add_file btn'
                        onChange={(event) => {
                            if (event.target?.files) {
                                handleChange('file', event.target?.files[0].name)
                            }
                        }} />
                </label>

                {(!!selectedTodoId) ? (
                    <>
                        <button
                            onClick={updateTodo}
                            className="btn">
                            Update
                        </button>
                        <button
                            onClick={cancelUpdate}
                            className="btn">
                            Cancel
                        </button>
                    </>
                ) : (
                    <button
                        className='create_btn btn'
                        onClick={createTask}>
                        Создать задание
                    </button>
                )
                }
            </div>
            <br />
        </>
    )
}

export default ControlTask;