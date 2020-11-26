import { Card } from "@material-ui/core";
import React, {useState, useEffect} from "react";
import {hitAPI} from "../api/index";

const Routines = () => {
    const [routinesList, setRoutinesList] = useState([]);

    useEffect(() => {
        hitAPI("GET", "/routines")
            .then((data) => {
                console.log(data)
                setRoutinesList(data);
            })
            .catch((error) => {
                console.error("There was a problem getting your routines", error);
            })
    }, []);

    return (
        <>
            <h1>View your Routines...</h1>
            <div className="routines-page">
            {routinesList.map((routine) => {
                return (
                    <Card className="routine" key={routine.id, routine.creatorID, routine.isPublic}>
                        <h2>{routine.creatorName}'s {routine.name}</h2>
                        <p className="routine-goal">{routine.goal}</p>
                        {routine.activities.map((activity) => {
                            return <div key={activity.id}>
                            <p className="activity-name">{activity.name}</p>
                            <p className="activity-description">{activity.description}</p>
                            <p className="activity-duration">Duration:{activity.duration}</p>
                            <p className="activity-count">Count:{activity.count}</p>
                            </div>
                        })}
                        
                        
                    </Card>
                );
            })}
            </div>
            
            
        </>
    )


}

export default Routines;