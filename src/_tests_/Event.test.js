import { render } from '@testing-library/react';
import { mockData } from '../mock-data';
import Event from '../components/Event';

describe('<Event /> component', () => {
  let EventComponent;
  let event;
  // render the Event component before each test
  beforeEach(() => {
    event = mockData[];
    EventComponent = render(<Event event={event} />);
  });

  // test Event component renders with title
  test('event title is shown', () => {
    expect(EventComponent.queryByText(event.summary)).toBeInTheDocument();
  });

  // test Event component renders with start time
  test('event start time is shown', () => {
    expect(EventComponent.queryByText(event.created)).toBeInTheDocument();
  });

  // test Event component renders with location
  test('event location is shown', () => {
    expect(EventComponent.queryByText(event.location)).toBeInTheDocument();
  });

  // test Event component renders with show details button
  test('show details button is shown', () => {
    expect(EventComponent.queryByText('Show Details')).toBeInTheDocument();
  });

  // test Event component renders with hide details button
  test('details are hidden by default', () => {
    expect(EventComponent.queryByText('Description')).not.toBeInTheDocument();
  });

  // test Event component renders with show details button with the title 'Show Details'
  test('details are shown when show details button is clicked', () => {
    expect(EventComponent.queryByText('Show Details')).toBeInTheDocument();
  });

  // test Event component renders as showDetails: false by default
  test('details are hidden by default', () => {
    expect(EventComponent.state('showDetails')).toBe(false);
  });

  // test Event component renders as showDetails: true when showDetails button is clicked
  test('details are shown when show details button is clicked', () => {
    EventComponent.find('.details-btn').simulate('click');
    expect(EventComponent.state('showDetails')).toBe(true);
  });

  // test Event component renders as showDetails: false when hideDetails button is clicked
  test('details are hidden when hide details button is clicked', () => {
    EventComponent.setState({ showDetails: true });
    EventComponent.find('.details-btn').simulate('click');
    expect(EventComponent.state('showDetails')).toBe(false);
  });
});
