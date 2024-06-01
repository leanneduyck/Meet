import './App.css';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import Event from './components/Event';
import { useEffect, useState } from 'react';
import { extractLocations } from './api';
import mockData from './mock-data';
import NumberOfEvents from './components/NumberOfEvents';

const App = () => {
  const [events, setEvents] = useState([])
  const [locations, setLocations] = useState([])

  useEffect(() => {
      setEvents(mockData)
      setLocations(extractLocations(mockData))
  },[])

  // returns the EventList component, the CitySearch component, and the Event component
  return (
    <div className="App">
      <CitySearch allLocations={locations} />
      <EventList events={events} />
      <NumberOfEvents />
    </div>
  );
};

export default App;
