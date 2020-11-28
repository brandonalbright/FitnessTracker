import React, {useState, useEffect} from "react";
import {getToken, hitAPI} from "../api/index";
import "./activities.css";

const Activities = () => {
  const [activitiesList, setActivitiesList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [active, setActive] = useState(false);

  useEffect(() => {
    hitAPI("GET", "/activities")
      .then((data) => {
        setActivitiesList(data.sort((a, b) => (a.id < b.id) ? 1 : -1));
      })
      .catch(console.error);
  }, []);

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
    <div className="activities-page">
      <div className="activities-header">
        <h1>Activities</h1>
        {getToken() ? (
            <button className="modal-button" onClick={() => {
              setShowModal(true);
            }}>Create New Activity</button>
          ) : null}
      </div>
      <div className="activities-list">
        {activitiesList.map((activity) => {
          return (
          <section className="activity" key={activity.id} onClick={() => {
            console.log(activity.id);
          }}>
            <h2 className="activity-name">{activity.name}</h2>
            <p className="activity-desc">{activity.description}</p>
          </section>
        );})}
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
                setDescription('');
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
  )
}

export default Activities;