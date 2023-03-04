import React from 'react';
import {render, screen, fireEvent, cleanup} from '@testing-library/react';
import SideNav from '.';
import {BrowserRouter} from 'react-router-dom';

describe('Sidenav components Unit Test', () => {
  afterEach(cleanup);
  it('should render Sidenav to screen properly', () => {
    render(<SideNav />, {wrapper: BrowserRouter});
    const sideNAV = screen.getByTestId('sidenav');
    expect(sideNAV).toBeInTheDocument();
  });

  it('should render navigate to other screen when click', async () => {
    render(<SideNav />, {wrapper: BrowserRouter});
    await fireEvent.click(screen.getByTestId(/Home/i));
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });
  it('should logout when click', async () => {
    render(<SideNav />, {wrapper: BrowserRouter});
    await fireEvent.click(screen.getByTestId(/Logout/i));
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });
  it('should expect localstorage to be called', async () => {
    window.localStorage.setItem('isLogin', true);
    render(<SideNav />, {wrapper: BrowserRouter});
    expect(window.localStorage.getItem('isLogin')).toBeTruthy();
  });
});
