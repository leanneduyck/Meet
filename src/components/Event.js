import { useState } from 'react';

const Event = ({ event }) => {
  // state to store whether the event details are shown
  const [showDetails, setShowDetails] = useState(false);
  // if there is no event, return null; otherwise, return the event details
  return (
    <li className="event">
      <h2>{event && event.summary}</h2>
      <p>{event && event.location}</p>
      <p>{event && new Date(event.created).toUTCString()}</p>
      {showDetails ? (
        <p className="details">{event && event.description}</p>
      ) : null}
      <button
        // button to show or hide the event details
        className="details-btn"
        onClick={() => {
          showDetails ? setShowDetails(false) : setShowDetails(true);
        }}
      >
        {showDetails ? 'hide details' : 'show details'}
      </button>
    </li>
  );
};

export default Event;
