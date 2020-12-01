import { Card } from "@material-ui/core";
import React, {useState, useEffect} from "react";
import {getToken, hitAPI} from "../api/index";
import "./myRoutines.css";

const MyRoutines = ({getToken,
  setActive,
  routinesList,
  setRoutinesList,
  username}) => {
  const [showModal, setShowModal] = useState(false);
  const [myRoutines, setMyRoutines] = useState([])
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [err, setErr] = useState(false);
  // const [display, setDisplay] = useState(false);
  setActive('myroutines');

  function routinesFilter(routine) {
    return routine.creatorName == username;
  }

  useEffect(() => {
    setMyRoutines(routinesList.filter((routine) => {
      return routine.creatorName === username;
    }))
  }, [routinesList]);

  console.log(myRoutines);

  function clearForm() {
    setName('');
    setDescription('');
  };

  function checkDisabled() {
    if (name === '' || description === '') {
      return true;
    }
    return false;
  }

  if (showModal) {
    document.querySelector('body').style.overflow = 'hidden';
  } else {
    document.querySelector('body').style.overflow = 'visible';
  };

  return (
    <div className="myroutines-page">
      <div className="myroutines-header">
        <h1>My Routines</h1>
        {getToken() ? (
              <button className="modal-button" onClick={() => {
                setShowModal(true);
                console.log(showModal);
              }}>Create New Routine</button>
            ) : null}`
      </div>
      <div className="myroutines-list">
        {myRoutines.map((routine) => {
          return (
            <Card className="myroutine" key={routine.id, routine.isPublic}>
              <h2 className="myroutine-header">{routine.name}</h2>
              <p className="myroutine-goal">Routine Goal: {routine.goal}</p>
              {routine.activities.map((activity) => {
                return <div key={activity.id}>
                <p className="myactivity-name">Activity: {activity.name}</p>
                <p className="myactivity-description">Description: {activity.description}</p>
                <p className="myactivity-duration">Duration: {activity.duration}</p>
                <p className="myactivity-count">Count: {activity.count}</p>
                </div>
              })}
            </Card>
          )
        })}
      </div>
      {showModal ? (
        <div className="modal">
          <div className="contents">
            <label>Add A New Activity</label>
            <form className="activity-form" onSubmit={(event) => {
              event.preventDefault();
            }}>
              <div>
                <input type="text" placeholder="name of activity"
                  value={name}
                  onChange={(event) => {
                    setErr(false);
                    setName(event.target.value);
                  }} required />
                <h5>required field</h5>
              </div>
              <div>
                <textarea placeholder="description" rows="4"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)} required />
                <h5>required field</h5>
              </div>
              {err ? (
                <h5 className="duplicate">"{name}" already exists</h5>
              ) : <h5>&nbsp;</h5>}
              <div className="buttons">
                <button className="cancel-button"
                  onClick={() => {
                    setErr(false);
                    clearForm();
                    setShowModal(false);
                  }}>Cancel</button>
                <button className="add-button"
                  disabled={checkDisabled()}>Add Activity!</button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default MyRoutines;