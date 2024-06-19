import { useState } from 'react';

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  const [numberOfEvents, setNumberOfEvents] = useState(32);
  // set to empty string to avoid placeholder number, instead shows placeholder text
  const [tempValue, setTempValue] = useState('');

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setTempValue(value);

    // clears the error alert when the input is empty
    if (value === '') {
      setErrorAlert('');
    } else if (isNaN(Number(value)) || Number(value) <= 0) {
      setErrorAlert('Please enter a valid number');
    } else {
      setErrorAlert('');
    }
  };

  const handleInputBlur = () => {
    const value = Number(tempValue);

    // if the value is not a number or is less than or equal to 0, then setErrorAlert
    if (isNaN(value) || value <= 0) {
      // revert to last valid value
      setTempValue(numberOfEvents);
      setErrorAlert('Please enter a valid number.');
    } else {
      setNumberOfEvents(value);
      setCurrentNOE(value);
      setErrorAlert('');
    }
  };

  // user presses 'enter' or click outside the input field to submit
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleInputBlur();
    }
  };

  return (
    <div id="number-of-events">
      <input
        data-testid="number-of-events-field"
        id="number-of-events-field"
        type="text"
        className="number-of-events-input"
        placeholder={tempValue === '' ? 'Number of events' : ''}
        value={tempValue}
        onChange={handleInputChanged}
        onBlur={handleInputBlur}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default NumberOfEvents;
