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
  // const [display, setDisplay] = useState(false);
  setActive('myroutines');

  // useEffect(() => {
  //   setMyRoutines(routinesList.filter((routine) => {
  //     return routine.creatorName === username;
  //   }))
  // }, [routinesList]);

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
                <p className="myactivity-goal">Description: {activity.goal}</p>
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
            <label>Add A New Routine</label>
            <form className="activity-form" onSubmit={(event) => {
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
    </div>
  );
}

export default MyRoutines;