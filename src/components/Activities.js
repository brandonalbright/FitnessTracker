import React, {useState, useEffect} from "react";
import {getToken, hitAPI} from "../api/index";

const Activities = () => {
  const [activitiesList, setActivitiesList] = useState([]);

  useEffect(() => {
    hitAPI("GET", "/activities")
      .then((data) => {
        setActivitiesList(data);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <h1>This is the ACTIVITIES PAGE</h1>
      <div className="activities-page">
        {activitiesList.map((activity) => {
          return (
          <section className="activity" key={activity.id}>
            <h2 className="activity-name">{activity.name}</h2>
            <p className="activity-desc">{activity.description}</p>
          </section>
        );})}
      </div>
    </>
  )
}

export default Activities;