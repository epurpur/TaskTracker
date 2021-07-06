import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'


function App() {

  // handles showing the add task form or not by clicking 'add' button
  const [showAddTask, setShowAddTask] = useState(true)


  // tasks are now a part of app (component) level state
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])  //empty dependency array


  // fetch data from JSON server
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    
    return data
  }


  //fetch individual task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }


  // Add Task
  const addTask = async (task) => {

    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])

  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })

    // filters out tasks that are not equal to id of the one that is clicked on the UI
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  // toggles green bar next to task to remind you about it
  const toggleReminder = async (id) => {

    // update reminder
    const taskToToggle = await fetchTask(id)
    console.log(taskToToggle)
    // sets reminder to opposite of current value
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    // maps over all tasks.  If the task.id === the one user clicks on, set that particular task.reminder to the opposite of its current value
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task))
  }

  // can only return 1 element in JSX expression.  Can have others nested inside
  return (
    <Router>
      <div className="container">
        <Header title='Task Tracker' onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      
        {/* Routes */}

        {/* Home Route */}
        <Route path='/' exact render={(props) => (
          <>
            {showAddTask && <AddTask onAdd={addTask} />}
            {/* Using ternary operator. If tasks, show them. If not show 'no tasks to show' */}
            {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Tasks To Show'}
          </>
        )}/>

        {/* About Page */}
        <Route path='/about' component={About}/>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
