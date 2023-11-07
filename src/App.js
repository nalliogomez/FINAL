import { Routes, Route, BrowserRouter} from 'react-router-dom';
import ShowClients from './components/clients';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ShowClients></ShowClients>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
