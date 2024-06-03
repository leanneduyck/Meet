// // trying CF GH code
// import { render } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import NumberOfEvents from '../components/NumberOfEvents';

// describe('<NumberOfEvents /> component', () => {
//   let NumberOfEventsComponent;
//   beforeEach(() => {
//     NumberOfEventsComponent = render(<NumberOfEvents />);
//   });

//   test('renders number of events text input', () => {
//     const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
//     expect(numberTextBox).toBeInTheDocument();
//     expect(numberTextBox).toHaveClass('number-of-events-input');
//   });

//   test('default number is 32', async () => {
//     const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
//     expect(numberTextBox).toHaveValue('32');
//   });

//   test('number of events text box value changes when the user types in it', async () => {
//     const user = userEvent.setup();
//     const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
//     await user.type(numberTextBox, '123');

//     // 32 (the default value already written) + 123
//     expect(numberTextBox).toHaveValue('32123');
//   });
// });

// my original code

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

const mockFn = jest.fn();
describe('<NumberOfEvents /> component', () => {
  // render the NumberOfEvents component before each test
  beforeEach(() => {
    render(<NumberOfEvents updateEvents={mockFn} />);
  });

  // test that NumberOfEvents text input renders correctly
  test('renders textbox', () => {
    const numberOfEventsTextBox = screen.getByTestId('number-of-events');
    expect(numberOfEventsTextBox).toBeInTheDocument();
    expect(numberOfEventsTextBox).toHaveClass('number-of-events');
  });

  // test that default value of textbox is 32
  test('default value of textbox is 32', () => {
    const numberOfEventsTextBox = screen.getByTestId('number-of-events');
    expect(numberOfEventsTextBox).toHaveValue('32');
  });

  // test that value of NumberOfEvents textbox changes when user types in textbox
  test('updates value of textbox cor  const user = userEvent.setup()', async () => {
    const numberOfEventsTextBox = screen.getByTestId('number-of-events');
    await fireEvent.change(numberOfEventsTextBox, { target: { value: '24' } });
    expect(numberOfEventsTextBox).toHaveValue('24');
  });
});
