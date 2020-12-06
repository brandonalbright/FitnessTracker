import React, { useState }  from 'react'
import {hitAPI} from "../api/index";

function AddActivities(props) {
    const {activitiesList, routineid} = props;
    const [count, setCount] = useState('');
    const [duration, setDuration] = useState('');
    const [addActivityid, setAddActivityid] = useState('315');
    

    return (
    <form>
        <select
            onChange={(event)=> {
                setAddActivityid(event.target.value)
                }}>
            {activitiesList.map((activity, indx) => {
            return <option 
                    value={activity.id}
                    valuename={activity.name}
                    key={indx}
                    >
                    {activity.name}</option>
            })}
        </select>
        <div className="count-duration">
            <input 
                type="text" 
                placeholder="Count"
                value={count}
                onChange={(event)=> {
                    setCount(event.target.value)
                }}>
            </input>
            <input 
                type="text" 
                placeholder="Duration"
                value={duration}
                onChange={(event)=> {
                    setDuration(event.target.value)
                }}>
            </input>
        </div>
        <button
            onClick={(event)=> {
                let addedActivity = {
                    activityId: addActivityid,
                    count: count, 
                    duration: duration}
                event.preventDefault()
                hitAPI("POST", `/routines/${routineid}/activities`, addedActivity)
                .then((result) => {
                    console.log(result)
                    console.log(routineid)
                    console.log(addedActivity)
                });
            }}>ADD</button>
    </form>)
}

export default AddActivities