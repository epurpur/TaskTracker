import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import { useState } from 'react';


function App() {

  // handles showing the add task form or not by clicking 'add' button
  const [showAddTask, setShowAddTask] = useState(true)

  // tasks are now a part of app (component) level state
  const [tasks, setTasks] = useState([
    {
        id: 1,
        text: 'Doctors Appointment',
        day: 'Feb 5th at 2:30pm',
        reminder: true,
    },
    {
        id: 2,
        text: 'Meeting at school',
        day: 'Feb 6th at 1:30pm',
        reminder: true,
    },
    {
        id: 3,
        text: 'Food shopping',
        day: 'Feb 5th at 2:30pm',
        reminder: false,
    },
  ])

  // Add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1

    const newTask = {id, ...task}

    //add newTask to array of tasks. copy array of current tasks and add newTask to it.
    setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask = (id) => {
    // filters out tasks that are not equal to id of the one that is clicked on the UI
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  // toggles green bar next to task to remind you about it
  const toggleReminder = (id) => {
    // maps over all tasks.  If the task.id === the one user clicks on, set that particular task.reminder to the opposite of its current value
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task))
  }

  // can only return 1 element in JSX expression.  Can have others nested inside
  return (
    <div className="container">
      <Header title='Task Tracker' onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {/* Using ternary operator. If tasks, show them. If not show 'no tasks to show' */}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Tasks To Show'}
    </div>
  );
}

export default App;
