import { Card } from "@material-ui/core";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React, {useState, useEffect} from "react";
import {getToken, hitAPI} from "../api/index";
import Modals from "./RoutineModals";
import "./myRoutines.css";
import AddActivities from "./AddActivities"

const MyRoutines = ({
  setActive,
  routinesList,
  setRoutinesList,
  username,
  activitiesList,
  updateActivities,
  setUpdateActivities}) => {
  const [showModal, setShowModal] = useState(false);
  const [myRoutines, setMyRoutines] = useState([])
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [showBack, setShowBack] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [ID, setID] = useState(null);
  const [count, setCount] = useState('');
  const [duration, setDuration] = useState('');
  const [addActivityid, setAddActivityid] = useState('315');
  const [activityEdit, setActivityEdit] = useState(false)
  setActive('myroutines');

  useEffect(() => {
    hitAPI("GET", `/users/${username}/routines`)
      .then((data) => {
        setMyRoutines(data.sort((a, b) => (a.name > b.name) ? 1 : -1));
      })
      .catch(console.error);
  }, [routinesList, username]);

  return (
    <div className="page">
      <div className="header">
        <h1>My Routines</h1>
        {getToken() ? (
              <button className="modal-button" onClick={() => {
                setShowModal(true);
              }}>New Routine</button>
            ) : null}
      </div>
      <div className="list">
        {myRoutines.map((routine) => {
          return (
            <Card className="card myroutines" key={routine.id}>
              <div className="card-header">
                <h2 className="myroutine-name">{routine.name} {((ID === routine.id) && showBack) ? "Activities" : null}</h2>
              </div>
              <div className="card-body">
              {ID === routine.id && showBack && showAdd? 
                <AddActivities 
                  activitiesList={activitiesList} 
                  routineid={routine.id} 
                  setShowAdd={setShowAdd} 
                  setUpdateActivities={setUpdateActivities} 
                  updateActivities={updateActivities}
                  count={count}
                  setCount={setCount}
                  duration={duration}
                  setDuration={setDuration}
                  addActivityid={addActivityid}
                  setAddActivityid={setAddActivityid}
                  activityEdit={activityEdit}
                  setActivityEdit={setActivityEdit}/> 
                  : null}
                {ID === routine.id && showBack ? (
                  routine.activities <1? <p>No activities, press "Add" to add activities to your routine.</p>
                  :
                  routine.activities.map((activity) => {
                    
                    return (
                      <Accordion className="myroutine-activity" key={activity.id}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          // aria-controls={`${activity.name}-content`}
                          // id={`${activity.name}-header`}
                        >
                          <Typography className="myactivity-name">{activity.name}</Typography>
                          <Typography className="myactivity-count">Reps: {activity.count}</Typography>
                          <Typography className="myactivity-duration">Duration: {activity.duration} minutes</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography className="myactivity-goal">{activity.description}</Typography>
                          <DeleteIcon 
                            onClick={() => {
                              
                              hitAPI("DELETE", `/routine_activities/${activity.routineActivityId}`)
                                .then((data) => {
                                  setUpdateActivities(!updateActivities)
                                })
                                .catch(console.error);
                            }}/>
                          <EditIcon 
                            onClick={() => {
                              setShowAdd(true)
                              setActivityEdit(true)
                              setAddActivityid(activity.routineActivityId)
                              setCount(activity.count)
                              setDuration(activity.duration)
                            }}/>
                        </AccordionDetails>
                      </Accordion>
                    )
                  })
                  )
                  : (
                  <p className="myroutine-goal">Goal: {routine.goal}</p>
                  )
                }
              </div>
              <div className="card-footer">
                <button className="flip"
                  onClick={() => {
                    setShowBack(!showBack);
                    setID(routine.id);
                  }}>{((ID === routine.id) && showBack ? "Goal" : "Activities")}</button>
                <button className="edit"
                  onClick={((ID === routine.id) && showBack) ? (
                    () => {
                      setID(routine.id);
                      setShowAdd(!showAdd)

                    }
                    ) : (
                    () => {
                      setID(routine.id);
                      setName(routine.name);
                      setGoal(routine.goal);
                      setShowModal(true);
                    }
                  )}>{((ID === routine.id) && showBack ? "Add" : "Edit")}</button>
                <button className="delete"
                  onClick={() => {
                    setID(routine.id)
                    setShowDelete(true);
                  }}>Delete</button>
              </div>
            </Card>
          )
        })}
      </div>
      <Modals
        ID={ID}
        setID={setID}
        routinesList={routinesList}
        setRoutinesList={setRoutinesList}
        myRoutines={myRoutines}
        showModal={showModal}
        setShowModal={setShowModal}
        showDelete={showDelete}
        setShowDelete={setShowDelete}
        name={name}
        goal={goal}
        setName={setName}
        setGoal={setGoal} />
    </div>
  );
}

export default MyRoutines;