import React, {useState, useEffect} from "react";
import {getToken, hitAPI} from "../api/index";

const MyRoutines = ({getToken}) => {
  const [showModal, setShowModal] = useState(false);
  const [myRoutines, setMyRoutines] = useState([])
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [active, setActive] = useState(false);
  const [display, setDisplay] = useState(false);

  function clearForm() {
    setName('');
    setDescription('');
  };

  function checkDuplicate() {
    let nameCheck;
    for (let i = 0; i < activitiesList.length; i++) {
      nameCheck = activitiesList[i].name;
      if (name === nameCheck) {
        return true;
      }
    }
    return false;
  }

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

      </div>
      {showModal ? (
        <div className="modal">
          <div className="contents">
            <label>Add A New Activity</label>
            <form className="activity-form" onSubmit={(event) => {
              event.preventDefault();

              const data = {
                name,
                description
              };

              if (checkDuplicate()) {
                setActive(true);
              } else {
                hitAPI("POST", "/activities", data)
                .then((data) => {
                  setActivitiesList([data, ...activitiesList]);
                  clearForm();
                  setShowModal(false);
                });
              }
            }}>
              <div>
                <input type="text" placeholder="name of activity"
                  value={name}
                  onChange={(event) => {
                    setActive(false);
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
              {active ? (
                <h5 className="duplicate">"{name}" already exists</h5>
              ) : <h5>&nbsp;</h5>}
              <div className="buttons">
                <button className="cancel-button"
                  onClick={() => {
                    setActive(false);
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