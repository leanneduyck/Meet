import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockData from '../mock-data';
import Event from '../components/Event';

describe('<Event /> component', () => {
  const event = mockData[0];
  beforeEach(() =>{
     render(<Event event={event} />);
  })
   
  // test Event component renders with title
  test('event title is shown', () => {
    console.log(event.summary);
    expect(screen.queryByText(event.summary)).toBeInTheDocument();
  });

  // test Event component renders with start time
  test('event start time is shown', () => {
    expect(screen.queryByText(event.start.dateTime)).toBeInTheDocument();
  });

  // test Event component renders with location
  test('event location is shown', () => {
    expect(screen.queryByText(event.location)).toBeInTheDocument();
  });

  // test Event component renders with show details button
  test('show details button is shown', () => {
    expect(screen.queryByText('Show Details')).toBeInTheDocument();
  });

  // test Event component renders with hide details button
  test('details are hidden by default', () => {
    expect(screen.queryByText('Description')).not.toBeInTheDocument();
  });

  // test Event component renders with show details button with the title 'Show Details'
  // test('details are shown when show details button is clicked', () => {
  //   userEvent.click
  //   expect(screen.queryByText('Hide Details')).toBeInTheDocument();
  // });

  // test Event component renders as showDetails: false by default
  // test('details are hidden by default', () => {
  //   expect(EventComponent.state('showDetails')).toBe(false);
  // });

  // // test Event component renders as showDetails: true when showDetails button is clicked
  // test('details are shown when show details button is clicked', () => {
  //   EventComponent.find('.details-btn').simulate('click');
  //   expect(EventComponent.state('showDetails')).toBe(true);
  // });

  // // test Event component renders as showDetails: false when hideDetails button is clicked
  // test('details are hidden when hide details button is clicked', () => {
  //   EventComponent.setState({ showDetails: true });
  //   EventComponent.find('.details-btn').simulate('click');
  //   expect(EventComponent.state('showDetails')).toBe(false);
  // });
});
