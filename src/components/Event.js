import { useState } from "react";

// component for each event in the list
const Event = ({event }) => {
  const [showDetails, setShowDetails] = useState(false);
 
  if(!event){
    return null
  }
 
  return ( 
      <li className="event">
          <h3>{event.summary}</h3>
          <p>{event.location}</p>
          <p data-testid="start-time">{event.start.dateTime}</p>
          {showDetails ? 
          <p className="details">{event.description}</p> : null }
          <button className="details-btn" onClick={() => setShowDetails(!showDetails)}>
              {showDetails ? "Hide Details" : "Show Details"}</button>
      </li>
  );
};

export default Event;
