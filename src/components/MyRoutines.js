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

const MyRoutines = ({
  setActive,
  routinesList,
  setRoutinesList,
  username}) => {
  const [showModal, setShowModal] = useState(false);
  const [myRoutines, setMyRoutines] = useState([])
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [showBack, setShowBack] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [ID, setID] = useState(null);
  setActive('myroutines');

  useEffect(() => {
    hitAPI("GET", `/users/${username}/routines`)
      .then((data) => {
        console.log(data)
        setMyRoutines(data.sort((a, b) => (a.name > b.name) ? 1 : -1));
      })
      .catch(console.error);
  }, [routinesList]);

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
                <h2 className="myroutine-name">{routine.name} {((ID === routine.id) && showBack) ? "Activities" : routine.id}</h2>
              </div>
              <div className="card-body">
                {ID === routine.id && showBack ? (
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
                          <Typography className="myactivity-duration">Duration: {activity.duration} mintes</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography className="myactivity-goal">{activity.description}</Typography>
                          <DeleteIcon />
                          <EditIcon />
                        </AccordionDetails>
                      </Accordion>
                    )
                  })
                  ) : (
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
                      // setShowModal(true);

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