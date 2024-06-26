import Event from './Event';

const EventList = ({ events }) => {
  // returns a list of Event components, uses map to iterate over the events array and key to assign a unique key to each event
  return (
    <ul id="event-list">
      {events
        ? events.map((event) => <Event key={event.id} event={event} />)
        : null}
    </ul>
  );
};

export default EventList;
