import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

const mockFn = jest.fn()
describe('<NumberOfEvents /> component', () => {
  // render the NumberOfEvents component before each test
  beforeEach(() => {
   render(<NumberOfEvents updateEvents={mockFn} />);
  });

  // test that NumberOfEvents text input renders correctly
  test('renders textbox', () => {
    const numberOfEventsTextBox =
      screen.getByTestId('number-of-events');
    expect(numberOfEventsTextBox).toBeInTheDocument();
    expect(numberOfEventsTextBox).toHaveClass('number-of-events');
  });

  // test that default value of textbox is 32
  test('default value of textbox is 32', () => {
    const numberOfEventsTextBox =
    screen.getByTestId('number-of-events');
    expect(numberOfEventsTextBox).toHaveValue('32');
  });

  // test that value of NumberOfEvents textbox changes when user types in textbox
  test('updates value of textbox cor  const user = userEvent.setup()', async () =>{
    const numberOfEventsTextBox =
    screen.getByTestId('number-of-events');
    await fireEvent.change(numberOfEventsTextBox,{target: {value:  '24'}});
    expect(numberOfEventsTextBox).toHaveValue('24');
  });
});
