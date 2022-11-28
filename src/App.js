import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { db } from './firebase_config';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import ControlTask from './components/ControlTask';
import ToDoList from './components/ToDoList';
import './App.css';

function App() {
  const [todo, setTodo] = useState({
    title: '',
    description: '',
    date: dayjs(new Date()).format('YYYY-MM-DD'),
    status: false,
    file: ''
  });
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const taskRef = collection(db, 'tasks');

  const handleChange = (type, value) => {
    setTodo({ ...todo, [type]: value })
  };

  const cancelUpdate = () => {
    setSelectedTodoId(null);
    setTodo({});
  };

  const createTask = async () => {
    setTasks([...tasks, todo])
    await addDoc(taskRef, {
      ...todo
    });
    setTodo({});
  };

  const updateTodo = async () => {
    setTasks(tasks.map((task) => {
      if (task.id === selectedTodoId) {
        return todo;
      };
      return task;
    }));
    const taskDoc = doc(db, "tasks", selectedTodoId);
    await updateDoc(taskDoc, todo);
    cancelUpdate();
  };

  const markDone = async (id) => {
    let newTask
    setTasks(tasks.map((task) => {
      if (task.id === id) {
        newTask = { ...task, status: !task.status }
        return newTask
      };
      return task;
    }));
    const taskDoc = doc(db, "tasks", id);
    await updateDoc(taskDoc, newTask);

  };

  const deleteTask = async (id) => {
    const taskDoc = doc(db, "tasks", id);
    await deleteDoc(taskDoc);
  };

  useEffect(() => {
    const getTasks = async () => {
      const data = await getDocs(taskRef);
      setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getTasks();
  }, []);

  return (
    <div className='App'>
      <h2>To Do List (ReactJS)</h2>
      <ControlTask
        todo={todo}
        setTodo={setTodo}
        selectedTodoId={selectedTodoId}
        handleChange={handleChange}
        createTask={createTask}
        updateTodo={updateTodo}
        cancelUpdate={cancelUpdate}
      />

      <ToDoList
        tasks={tasks}
        markDone={markDone}
        setTodo={setTodo}
        deleteTask={deleteTask}
        setSelectedTodoId={setSelectedTodoId}
      />
    </div>
  );
}

export default App;
