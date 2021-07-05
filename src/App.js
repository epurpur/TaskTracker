import Header from './components/Header'
import Tasks from './components/Tasks'
import { useState } from 'react';


function App() {

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

  // Delete Task
  const deleteTask = (id) => {
    // filters out tasks that are not equal to id of the one that is clicked on the UI
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = (id) => {
    console.log(id)
  }

  // can only return 1 element in JSX expression.  Can have others nested inside
  return (
    <div className="container">
      <Header title='Task Tracker' />

      {/* Using ternary operator. If tasks, show them. If not show 'no tasks to show' */}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Tasks To Show'}
    </div>
  );
}

export default App;
