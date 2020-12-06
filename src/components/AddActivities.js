import React from 'react'
import {hitAPI} from "../api/index";

function AddActivities(props) {
    const {activitiesList, 
            routineid, 
            setShowAdd, 
            updateActivities, 
            setUpdateActivities,
            count,
            setCount,
            duration,
            setDuration,
            addActivityid,
            setAddActivityid,
            activityEdit,
            setActivityEdit} = props;
    
    

    return (
    <form>
        {activityEdit? 
        null
        :
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
        }
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
                event.preventDefault();
                (activityEdit)?
                (hitAPI("PATCH", `/routine_activities/${addActivityid}/`, {count: count, duraction: duration})
                .then((result) => {
                    console.log(result)
                    setShowAdd(false)
                    setActivityEdit(false)
                    setUpdateActivities(!updateActivities)
                }))
                :
                hitAPI("POST", `/routines/${routineid}/activities`, {
                    activityId: addActivityid,
                    count: count, 
                    duration: duration})
                .then(() => {
                    setShowAdd(false)
                    setUpdateActivities(!updateActivities)
                });
            }}>{activityEdit? "EDIT": "ADD"}</button>
    </form>)
}

export default AddActivities