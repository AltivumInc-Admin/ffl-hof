import { Hero } from './Hero';
import { Standings } from './Standings';
import { ParticleField } from './ParticleField';
import { ESPNDebug } from './ESPNDebug';

export const HomePage = () => {
  return (
    <>
      <ParticleField />
      <Hero />
      <Standings />
      <ESPNDebug />
    </>
  );
};