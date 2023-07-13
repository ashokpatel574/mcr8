import React, { useState } from "react";
import { useData } from "../context/DataContext";

const HomePageHeader = () => {
  const [eventTypeInput, setEventTypeInput] = useState("");

  const { dispatch } = useData();

  const eventTypeHandler = (e) => {
    console.log(e.target.value);
    setEventTypeInput(e.target.value);
    dispatch({ type: "EventType", payload: e.target.value });
  };

  return (
    <div className="header_page-container">
      <h3>MeetUp Events</h3>
      <div>
        <label htmlFor="eventType"></label>
        <select
          className="eventType"
          id="eventType"
          name="eventType"
          value={eventTypeInput}
          onChange={eventTypeHandler}
          required
        >
          <option value="" disabled>
            Select Event Type
          </option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
          <option value="both">Both</option>
        </select>
      </div>
    </div>
  );
};

export default HomePageHeader;
