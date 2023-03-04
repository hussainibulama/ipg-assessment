import renderer from 'react-test-renderer';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
describe('App.js Snapshot test', () => {
  it('should render Page', () => {
    render(<App />, {wrapper: BrowserRouter});
    const appPage = screen.getByTestId('app');
    expect(appPage).toBeInTheDocument();
  });
  it('should maintain App file snapsjot', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <App />
        </BrowserRouter>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
