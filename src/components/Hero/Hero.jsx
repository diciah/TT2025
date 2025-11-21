import './Hero.css';

const Hero = () => {
  return (
    <header className="hero">
      <div className="hero-overlay" />
      <div className="hero-content container">
        <h1 className="hero-title">Todo para tus mejores amigos</h1>
        <p className="hero-subtitle">Alimentos, juguetes y confort para perros y gatos</p>
      </div>
      <img className="hero-img hero-img-left" src="/images/beagle.jpg" alt="Beagle" />
      <img className="hero-img hero-img-right" src="/images/golden.jpg" alt="Golden Retriever" />
    </header>
  );
};

export default Hero;
