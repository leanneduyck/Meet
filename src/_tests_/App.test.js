import { render, screen } from '@testing-library/react';
import App from '../App';

describe('<App /> component', () => {
  let AppDOM;
  // render the App component before each test
  beforeEach(() => {
    render(<App />);
  });

  // test that the App component renders correctly
  test('renders list of events', () => {
    expect(screen.getByTestId('event-list')).toBeInTheDocument();
  });

  // test that the CitySearch component renders correctly
  test('render CitySearch', () => {
    expect(screen.getByTestId('city-search')).toBeInTheDocument();
  });

  // test that the NumberOfEvents component renders correctly
  test('render NumberOfEvents', () => {
    expect(screen.getByTestId('number-of-events')).toBeInTheDocument();
  });
});
