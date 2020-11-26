import React, {useState, useEffect} from "react";
import {getToken, hitAPI} from "../api/index";
import "./activities.css";

const Activities = (props) => {
  const {
    getToken,
    loggedIn} = props;
  const [activitiesList, setActivitiesList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    hitAPI("GET", "/activities")
      .then((data) => {
        console.log(data)
        setActivitiesList(data);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <div className="activities-page">
        <div className="activities-header">
          <h1>Activities</h1>
          {loggedIn ? (
            showModal ? (
              <form className="modal" onSubmit={(event) => {
                event.preventDefault();

                const data = {
                  name,
                  description
                };

                hitAPI("POST", "/activities", data);

                setShowModal(false);
              }}>
                <h2>Add new Activity</h2>
                <input type="text" placeholder="name of activity"
                  value={name}
                  onChange={(event) => setName(event.target.value)} />
                <textarea placeholder="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)} />
                <input className="cancel-button" type="button" value="Cancel"
                  onClick={() => {
                    setShowModal(false);
                  }} />
                <input className="add-button" type="submit" value="Add Activity!" />
              </form>
            ) : (
              <button className="modal-button" onClick={() => {
                setShowModal(true);
                console.log(showModal);
              }}>Create New Activity</button>
            )
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
      </div>
    </>
  )
}

export default Activities;