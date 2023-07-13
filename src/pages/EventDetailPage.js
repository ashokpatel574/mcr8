import React from "react";
import { useParams, useNavigate } from "react-router";
import { useData } from "../context/DataContext";

const EventDetailPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const {
    state: { eventsData, rsvpState },
    dispatch,
  } = useData();

  const eventDetails = eventsData?.find(
    (eventItem) => eventItem.id === String(eventId)
  );

  const rsvphandler = () => {
    dispatch({
      type: "OpenModal",
      payload: eventDetails.isPaid,
    });
  };

  if (eventDetails) {
    const {
      title,
      hostedBy,
      eventThumbnail,
      eventDescription,
      additionalInformation,
      eventTags,
      eventStartTime,
      eventEndTime,
      location,
      isPaid,
      price,
      speakers,
    } = eventDetails;

    return (
      <>
        <h2>Meet Ups</h2>
        <section className="event_details_container">
          <div className="container-one">
            <div>
              <h3>{title}</h3>
              <p>Hosted By: {hostedBy}</p>
            </div>
            <div className="container-wrapper">
              <div>
                <img
                  src={eventThumbnail}
                  alt={title}
                  width={"250px"}
                  height={"250px"}
                />
              </div>

              <div>
                <p>Details</p>
                <p>{eventDescription}</p>
              </div>

              {additionalInformation && (
                <div>
                  <p>Additional Information</p>
                  <p>
                    <span>Dress Code: </span>

                    <span> {additionalInformation.dressCode}</span>
                  </p>
                  <p>
                    <span>Age Restrictions: </span>

                    <span> {additionalInformation.ageRestrictions}</span>
                  </p>
                </div>
              )}

              {eventTags.length > 0 && (
                <div>
                  <p>Event tags</p>
                  <p>{eventTags?.join(", ")}</p>
                </div>
              )}
            </div>
          </div>
          <div className="container-two">
            <div>
              <div>
                <p>Timings:</p>
                <span>{eventStartTime}</span> to <span>{eventEndTime}</span>
              </div>
              <div>Location: {location}</div>
              <div>{isPaid ? <span>{price}</span> : <span>Free</span>}</div>
            </div>
            <div>
              <h3>Speakers: ({speakers.length})</h3>
              <ul>
                {speakers.length > 0 &&
                  speakers.map((item, id) => (
                    <li key={id}>
                      <div>
                        <img
                          src={item.image}
                          alt={item.name}
                          width={"50px"}
                          height={"50px"}
                        />
                      </div>
                      <p>{item.name}</p>
                      <p>{item.designation}</p>
                    </li>
                  ))}
              </ul>
            </div>
            {Date.parse(new Date()) < Date.parse(eventEndTime) && (
              <div>
                {rsvpState ? (
                  <button>Already RSVPed!</button>
                ) : (
                  <button onClick={rsvphandler}>RSVP</button>
                )}
              </div>
            )}
          </div>
        </section>
      </>
    );
  } else {
    return <h3>No Event found!</h3>;
  }
};

export default EventDetailPage;
