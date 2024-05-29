import { render } from '@testing-library/react';
import App from '../App';

describe('<App /> component', () => {
  let AppDOM;
  // render the App component before each test
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  });

  // test that the App component renders correctly
  test('renders list of events', () => {
    expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
  });

  // test that the CitySearch component renders correctly
  test('render CitySearch', () => {
    expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
  });

  // test that the NumberOfEvents component renders correctly
  test('render NumberOfEvents', () => {
    expect(AppDOM.querySelector('#number-of-events')).toBeInHTMLElement();
  });
});
