import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Standings } from './components/Standings';
import { ParticleField } from './components/ParticleField';
import './styles/index.css';

function App() {
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