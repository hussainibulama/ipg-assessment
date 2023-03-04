import React from 'react';
import {render, screen, cleanup} from '@testing-library/react';
import TextInput from '.';

describe('TextBox components Unit Test', () => {
  afterEach(cleanup);
  it('should render textinput to screen', () => {
    render(<TextInput testid='input-box' label='name' />);
    const textInput = screen.getByTestId('input-box');
    expect(textInput).toBeInTheDocument();
  });
  it('should render error message', () => {
    render(
      <TextInput
        testid='input-box'
        label='name'
        errorText='invalid input'
        error={true}
      />,
    );
    const errMessage = screen.getByText(/invalid input/i);
    expect(errMessage).toBeInTheDocument();
  });
});
