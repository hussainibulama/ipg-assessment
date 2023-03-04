import './App.css';
import {Routes, Route} from 'react-router-dom';
import AllRoutes from './Components/Routes';
function App() {
  return (
    <div data-testid='app'>
      <Routes>
        {AllRoutes.map(({Path, Element, Index}) => (
          <Route key={Index} path={Path} element={<Element />} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
