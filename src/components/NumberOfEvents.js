import { useState } from 'react';

const NumberOfEvents = ({ updateEvents }) => {
  // state to store the number of events to display
  const [numberOfEvents, setNumberOfEvents] = useState(32);

  // function to handle changes to the text input field
  const handleInputChanged = (event) => {
    const value = event.target.value;
    setNumberOfEvents(value);
    updateEvents(null, value);
  };

  // returns a text input field to set the number of events to display
  return (
    <div id="number-of-events">
      <input
        data-testid="number-of-events"
        type="text"
        className="number-of-events"
        placeholder="Number of events"
        value={numberOfEvents}
        onChange={handleInputChanged}
      />
    </div>
  );
};

export default NumberOfEvents;
