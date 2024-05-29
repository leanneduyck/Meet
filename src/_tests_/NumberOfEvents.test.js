import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;
  // render the NumberOfEvents component before each test
  beforeEach(() => {
    NumberOfEventsComponent = render(<NumberOfEvents />);
  });

  // test that NumberOfEvents text input renders correctly
  test('renders textbox', () => {
    const numberOfEventsTextBox =
      NumberOfEventsComponent.queryByRole('textbox');
    expect(numberOfEventsTextBox).toBeInTheDocument();
    expect(numberOfEventsTextBox).toHaveClass('number-of-events');
  });

  // test that default value of textbox is 32
  test('default value of textbox is 32', () => {
    const numberOfEventsTextBox =
      NumberOfEventsComponent.queryByRole('textbox');
    expect(numberOfEventsTextBox).toHaveValue(32);
  });

  // test that value of NumberOfEvents textbox changes when user types in textbox
  test('updates value of textbox correctly when user types in textbox', async () => {
    const user = userEvent.setup();
    const numberOfEventsTextBox =
      NumberOfEventsComponent.queryByRole('textbox');
    await user.type(numberOfEventsTextBox, '24');
    expect(numberOfEventsTextBox).toHaveValue(24);
  });
});
