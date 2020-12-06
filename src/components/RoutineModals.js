import React, {useState} from "react";
import {hitAPI} from "../api/index";

const Modals = ({
  ID,
  setID,
  routinesList,
  setRoutinesList,
  showModal,
  setShowModal,
  showDelete,
  setShowDelete,
  name,
  goal,
  setName,
  setGoal,
  myRoutines
}) => {
  const [err, setErr] = useState(false);

  function checkDuplicate() {
    let listLength;
    let tempList;
    if (ID) {
      tempList = routinesList.filter(routine => routine.id !== ID);
      listLength = tempList.length;
    } else {
      tempList = routinesList.slice();
      listLength = tempList.length;
    }
    for (let i = 0; i < listLength; i++) {
      if (name === tempList[i].name) {
        return true;
      }
    }
    return false;
  }

  function clearForm() {
    setName('');
    setGoal('');
    setID(null);
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
    <>
    {/* Modal to add or edit routine */}
    {showModal ? (
      <div className="modal">
        <div className="contents">
          {ID ? (
            <label>Edit Routine</label>
          ) : (
            <label>Add A New Routine</label>
          )}
          <form className="new-form" onSubmit={async (event) => {
            event.preventDefault();

            const data = {
              name,
              goal,
              isPublic: true
            };

            if (checkDuplicate()) {
              setErr(true);
            } else {
              if (ID) {
                hitAPI("PATCH", `/routines/${ID}`, data)
                .then((data) => {
                  setRoutinesList([...routinesList, data]);
                })
                .catch(console.error);
              } else {
                hitAPI("POST", "/routines", data)
                .then((data) => {
                  setRoutinesList([...routinesList, data]);
                })
                .catch(console.error);
              };
              clearForm();
              setShowModal(false);
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
                disabled={checkDisabled()}>{ID ? "Edit" : "Add"} Routine!</button>
            </div>
          </form>
        </div>
      </div>
    ) : null}
    
    {/*modal to confirm deletion of routine*/}
    {showDelete ? (
      <div className="modal delete-modal">
        <div className="confirm-delete">
          <p>Delete this routine?</p>
          <button className="yes"
            onClick={() => {
              for (let i = 0; i < myRoutines.length; i++) {
                if (myRoutines[i].id === ID) {
                  hitAPI("DELETE", `/routines/${ID}`)
                    .then(() => {
                      setRoutinesList([routinesList.splice(i, 1)]);
                    })
                    .catch(console.error);
                  
                    break;
                }
              }
              setShowDelete(false);
              setID(null);
            }}>Yes</button>
          <button className="no"
            onClick={() => {
              setShowDelete(false);
            }}>No</button>
        </div>
      </div>
    ) : null}
    </>
  )
}

export default Modals;