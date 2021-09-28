import { useState, useEffect } from 'react';
import './App.css';
import AddTask from './components/AddTask';
import Header from './components/Header';
import Tasks from './components/Tasks';

function App() {
    const [tasks, setTasks] = useState([]);
    const [showAddTask, setShowAddTask] = useState(false);

    const baseUrl = 'http://localhost:5000/tasks';

    //Fetch tasks
    const fetchTasks = async () => {
        const res = await fetch(baseUrl);
        const data = await res.json();
        console.log(data);
        setTasks(data);
    };

    //Fetch tasks with axios
    // const fetchTasks = async () => {
    //   //const res = await axios.get(baseUrl);
    //   const { data } = await axios.get(baseUrl);

    //   //console.log(res.data);
    //   console.log(data);
    //   setTasks(data);
    // };

    //Fetch tasks with then-catch
    // const fetchTasks = () => {
    //   axios
    //     .get(baseUrl)
    //     .then(({ data }) => console.log(data))
    //     .catch((err) => console.log(err));
    // };

    useEffect(() => {
        fetchTasks();
    }, []);

    // Add Task
    const addTask = async (task) => {
        const res = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(task),
        });
        await res.json();
        fetchTasks();
    };

    //Add tasks with axios
    // const addTask = async (task) => {
    //   const res = await axios.post(baseUrl, task);
    //   //console.log(res);
    //   fetchTasks();
    // };

    // const addTask = (task) => {
    //   const id = Math.floor(Math.random() * 100) + 1;
    //   const newTask = { id, ...task };
    //   setTasks([...tasks, newTask]);
    // };

    // Delete Task
    const deleteTask = async (deletedTaskId) => {
        await fetch(`${baseUrl}/${deletedTaskId}`, {
            method: 'DELETE',
        });
        fetchTasks();
    };

    //Delete with axios
    // const deleteTask = async (deletedTaskId) => {
    //   await axios.delete(`${baseUrl}/${deletedTaskId}`);
    //   fetchTasks();
    // };

    // const deleteTask = (deletedTaskId) => {
    //   setTasks(tasks.filter((task) => task.id !== deletedTaskId));
    // };

    // Toggle Done
    const toggleDone = async (toggleDoneId) => {
        const res = await fetch(`${baseUrl}/${toggleDoneId}`);
        const data = await res.json();
        const updatedTask = { ...data, isDone: !data.isDone };

        await fetch(`${baseUrl}/${toggleDoneId}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(updatedTask),
        });
        fetchTasks();
    };

    //Toggle done with axios
    // const toggleDone = async (toggleDoneId) => {
    //   const { data } = await axios.get(`${baseUrl}/${toggleDoneId}`);
    //   console.log(data);
    //   const updatedTask = { ...data, isDone: !data.isDone };

    //   await axios.put(`${baseUrl}/${toggleDoneId}`, updatedTask);
    //   fetchTasks();
    // };

    // const toggleDone = (toggleDoneId) => {
    //   setTasks(
    //     tasks.map((task) =>
    //       task.id === toggleDoneId ? { ...task, isDone: !task.isDone } : task
    //     )
    //   );
    // };

    // Toggle Show
    const toggleShow = () => setShowAddTask(!showAddTask);

    return (
        <div className="container">
            <Header
                title="Task Tracker"
                showAddTask={showAddTask}
                toggleShow={toggleShow}
            />
            {showAddTask && <AddTask addTask={addTask} />}
            {tasks.length > 0 ? (
                <Tasks tasks={tasks} deleteTask={deleteTask} toggleDone={toggleDone} />
            ) : (
                'No Tasks to Show'
            )}
        </div>
    );
}

export default App;