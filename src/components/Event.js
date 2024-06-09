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

// //
// original code
// import { useState } from 'react';

// // component for each event in the list
// const Event = ({ event }) => {
//   const [showDetails, setShowDetails] = useState(false);

//   if (!event) {
//     return null;
//   }

//   return (
//     <li className="event">
//       <h3>{event.summary}</h3>
//       <p>{event.location}</p>
//       <p data-testid="start-time">{event.start.dateTime}</p>
//       {showDetails ? <p className="details">{event.description}</p> : null}
//       <button
//         className="details-btn"
//         onClick={() => setShowDetails(!showDetails)}
//       >
//         {showDetails ? 'Hide Details' : 'Show Details'}
//       </button>
//     </li>
//   );
// };

// export default Event;
