import React, {useState, useEffect} from "react";
import {getToken, hitAPI} from "../api/index";
import "./activities.css";

const Activities = ({getToken}) => {
  const [activitiesList, setActivitiesList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [active, setActive] = useState(false);

  useEffect(() => {
    hitAPI("GET", "/activities")
      .then((data) => {
        console.log(data)
        setActivitiesList(data.sort((a, b) => (a.id < b.id) ? 1 : -1));
      })
      .catch(console.error);
  }, []);

  function clearForm() {
    setName('');
    setDescription('');
  };

  function checkDuplicate() {
    console.log("name inside function: ", name);
    let nameCheck;
    for (let i = 0; i < activitiesList.length; i++) {
      nameCheck = activitiesList[i].name;
      console.log("nameCheck: ", nameCheck);
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
              console.log(showModal);
            }}>Create New Activity</button>
          ) : null}          
      </div>
      <div className="activities-list">
        {activitiesList.map((activity) => {
          return (
          <section className="activity" key={activity.id}>
            <h2 className="activity-name">{activity.name}</h2>
            <p className="activity-desc">{activity.description}</p>
          </section>
        );})}
      </div>
      {showModal ? (
        <div className="modal">
          <div className="contents">
            <h2>Add new Activity</h2>
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
                  console.log("data: ", data);
                  setActivitiesList([data, ...activitiesList]);
                  console.log("activities-list: ", activitiesList);
                  clearForm();
                  setShowModal(false);
                });
              }
            }}>
              <input type="text" placeholder="name of activity"
                value={name}
                onChange={(event) => {
                  setActive(false);
                  setName(event.target.value);
                }} required />
              <h5>required field</h5>
              <textarea placeholder="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)} required />
              <h5>required field</h5>
              {active ? (
                <p className="duplicate">An activity with name {name} already exists</p>
              ) : null}
              <div className="buttons">
                <input className="cancel-button" type="button" value="Cancel"
                  onClick={() => {
                    clearForm();
                    setShowModal(false);
                  }} />
                <input className="add-button" type="submit"
                  value="Add Activity!" disabled={checkDisabled()} />
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Activities;