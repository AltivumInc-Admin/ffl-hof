import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Standings } from './components/Standings';
import { ParticleField } from './components/ParticleField';
import { usePerformanceMonitoring } from './hooks/usePerformanceMonitoring';
import './styles/index.css';

function App() {
  // Enable performance monitoring in development for debugging
  usePerformanceMonitoring(import.meta.env.DEV);

  return (
    <div className="app">
      <ParticleField />
      <Navigation />
      <Hero />
      <Standings />
    </div>
  );
}

export default App;