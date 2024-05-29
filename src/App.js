import './App.css';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import Event from './components/Event';

const App = () => {
  // returns the EventList component, the CitySearch component, and the Event component
  return (
    <div className="App">
      <CitySearch />
      <EventList />
      <Event />
    </div>
  );
};

export default App;
