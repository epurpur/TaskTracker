import { useState } from 'react'

const AddTask = ({ onAdd }) => {

    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        //check for text in 'task' box
        if(!text) {
            alert('Please add a task')
            return
        }

        // pass in object to onAdd function
        onAdd({ text, day, reminder })

        // resets values of text boxes to empty and check box to unchecked
        setText('')
        setDay('')
        setReminder(false)

    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label> Task </label>
                {/* executes setText function and sets text value to whatever user types in */}
                <input type='text' placeholder='Add Task' value={text} onChange={(e) => setText(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label> Day & Time </label>
                <input type='text' placeholder='Add Day & Time' value={day} onChange={(e) => setDay(e.target.value)}/>
            </div>
            <div className='form-control form-control-check'>
                <label> Set Reminder </label>
                <input type='checkbox' checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>
            </div>

            <input className='btn btn-block' type='submit' value='Save Task'/>
        </form>
    )
}

export default AddTask
