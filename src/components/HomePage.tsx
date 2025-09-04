import { Hero } from './Hero';
import { Standings } from './Standings';
import { ParticleField } from './ParticleField';

export const HomePage = () => {
  return (
    <>
      <ParticleField />
      <Hero />
      <Standings />
    </>
  );
};