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
  const [goal, setGoal] = useState('');
  const [err, setErr] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [showBack, setShowBack] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  setActive('myroutines');

  useEffect(() => {
    hitAPI("GET", `/users/${username}/routines`)
      .then((data) => {
        console.log(data)
        setMyRoutines(data.sort((a, b) => (a.name > b.name) ? 1 : -1));
      })
      .catch(console.error);
  }, [routinesList]);

  console.log(myRoutines);

  function checkDuplicate() {
    let nameCheck;
    for (let i = 0; i < myRoutines.length; i++) {
      nameCheck = myRoutines[i].name;
      if (name === nameCheck) {
        return true;
      }
    }
    return false;
  }

  function clearForm() {
    setName('');
    setGoal('');
  };

  function checkDisabled() {
    if (name === '' || goal === '') {
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
                {showBack ? (<h2 className="myroutine-name">{routine.name} Activities</h2>) : (<h2 className="myroutine-name">{routine.name}</h2>)}
              </div>
              {showBack ? (
                <div className="card-body">
                  {routine.activities.map((activity) => {
                  return <div key={activity.id}>
                  <p className="myactivity-name">Activity: {activity.name}</p>
                  <p className="myactivity-goal">Description: {activity.goal}</p>
                  <p className="myactivity-duration">Duration: {activity.duration}</p>
                  <p className="myactivity-count">Count: {activity.count}</p>
                  </div>
                  })}
                </div>
              ) : (
                <div className="card-body">
                  <p className="myroutine-goal">Goal: {routine.goal}</p>
                </div>
              )}
              <div className="card-footer">
                <button className="edit">Edit</button>
                <button className="delete"
                  onClick={() => {
                    setShowDelete(true);
                  }}>Delete</button>
              </div>
            </Card>
          )
        })}
      </div>
      {showModal ? (
        <div className="modal">
          <div className="contents">
            <label>Add A New Routine</label>
            <form className="new-form" onSubmit={(event) => {
              event.preventDefault();

              const data = {
                name,
                goal,
                isPublic
              };

              if (checkDuplicate()) {
                setErr(true);
              } else {
                hitAPI("POST", "/routines", data)
                .then((data) => {
                  setRoutinesList([data, ...routinesList]);
                  clearForm();
                  setShowModal(false);
                });
              }
            }}>
              <div>
                <input type="text" placeholder="name of routine"
                  value={name}
                  onChange={(event) => {
                    setErr(false);
                    setName(event.target.value);
                  }} required />
                <h5>required field</h5>
              </div>
              <div>
                <textarea placeholder="goal" rows="4"
                  value={goal}
                  onChange={(event) => setGoal(event.target.value)} required />
                <h5>required field</h5>
              </div>
              {err ? (
                <h5 className="duplicate">"{name}" already exists as a routine.</h5>
              ) : <h5>&nbsp;</h5>}
              <div className="buttons">
                <button className="cancel-button"
                  onClick={() => {
                    setErr(false);
                    clearForm();
                    setShowModal(false);
                  }}>Cancel</button>
                <button className="add-button"
                  disabled={checkDisabled()}>Add Routine!</button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
      {showDelete ? (
        <div className="modal">
          <div className="confirm-delete">
            <p>Delete this routine?</p>
            <button className="yes"
              onClick={() => {
                console.log("delete");
                setShowDelete(false);
              }}>Yes</button>
            <button className="no"
              onClick={() => {
                setShowDelete(false);
              }}>No</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default MyRoutines;