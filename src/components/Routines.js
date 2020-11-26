import { Card } from "@material-ui/core";
import React, {useState, useEffect} from "react";
import hitAPI from "../api/index";

const Routines = () => {
    const [routinesList, setRoutinesList] = useState([]);

    useEffect(() => {
        hitAPI("GET", "/users/:username/routines")
            .then((data) => {
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
                    <Card className="routine" key={routine.id} key={routine.creatorID} key={routine.isPublic}>
                        <h2>{routine.creatorName}'s {routine.name}</h2>
                        <p className="routine-goal">{routine.goal}</p>
                        <p className="activity-name">{routine.activites.name}</p>
                        <p className="activity-description">{routine.activities.description}</p>
                        <p className="activity-duration">Duration:{routine.activities.duration}</p>
                        <p className="activity-count">Count:{routine.activities.count}</p>
                    </Card>
                );
            })}
            </div>
            
            
        </>
    )


}

export default Routines;