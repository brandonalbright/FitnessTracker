import React, {useState, useEffect} from "react";
import {getToken, hitAPI} from "../api/index";
import "./activities.css";

const Activities = (props) => {
  const {
    getToken,
    loggedIn} = props;
  const [activitiesList, setActivitiesList] = useState([]);
  const [showModal, setShowModal] = useState(false); 

  useEffect(() => {
    hitAPI("GET", "/activities")
      .then((data) => {
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
              <button className="unmodal" onClick={() => {
                setShowModal(false);
                console.log(showModal);
              }}>deactivate</button>
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