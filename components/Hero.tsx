import { Starfield } from './Starfield';
import { ParticleRing } from './ParticleRing';
import { HeroFade } from './HeroFade';

export function IntroStatement() {
  return <h1 className="intro"><span>Designing</span><br />with curiosity, clarity,<br />and a little personality.</h1>;
}

export function LocationInfo() {
  return <div className="location" id="about">
    <p>Product Designer based in New York City</p>
    <p>B.S. Human-Computer Interaction @ NJIT</p>
  </div>;
}

export function Hero() {
  return <section className="hero" id="home" aria-label="Introduction">
    <Starfield />
    <div className="composition"><ParticleRing /><IntroStatement /></div>
    <LocationInfo />
    <HeroFade />
  </section>;
}
