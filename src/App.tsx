import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChooseYourSkipSize from './Components/ChooseYourSkipSize';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChooseYourSkipSize />} />
        <Route path="/choose-skip-size" element={<ChooseYourSkipSize />} />
      </Routes>
    </Router>
  );
}

export default App;