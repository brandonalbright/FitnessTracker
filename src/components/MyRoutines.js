import React, {useState, useEffect} from "react";
import {getToken, hitAPI} from "../api/index";

const MyRoutines = ({getToken}) => {
  const [showModal, setShowModal] = useState(false);
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
      {}
    </div>
  );
}

export default MyRoutines;