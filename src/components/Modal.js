import React, { useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useData } from "../context/DataContext";

const Modal = () => {
  const [userData, setUserData] = useState({ name: "", email: "" });

  const {
    dispatch,
    state: { eventPaid },
  } = useData();

  const InputHandler = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: "RSVPEvent",
      payload: { ...userData },
    });
  };

  const closeModalHandler = () => {
    dispatch({
      type: "CloseModal",
    });
  };

  return (
    <section className="modal_section">
      <div className="modal_container flex-column">
        <div className="modal_container-header">
          <span className="title">Complete your RSVP</span>

          <span onClick={closeModalHandler} className="closeModal">
            <HighlightOffIcon />
          </span>
        </div>
        <p>Fill in your personal Information</p>
        <div className="modal_container-body">
          <form className="form" value={userData} onSubmit={formSubmitHandler}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                className="name"
                type="text"
                placeholder="Enter name here"
                name="name"
                value={userData.name}
                onChange={InputHandler}
                required
              />
            </div>

            <div>
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                className="email"
                type="email"
                placeholder="Enter email here"
                name="email"
                value={userData.email}
                onChange={InputHandler}
                required
              />
            </div>

            {eventPaid && <p>* You have to make payment at the venue</p>}

            <button type="submit" className="btn submitBtn">
              RSVP
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Modal;
