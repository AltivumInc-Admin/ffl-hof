import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { Schedule } from './components/Schedule';
import { usePerformanceMonitoring } from './hooks/usePerformanceMonitoring';
import './styles/index.css';

function App() {
  // Enable performance monitoring in development for debugging
  usePerformanceMonitoring(import.meta.env.DEV);

  return (
    <Router>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;