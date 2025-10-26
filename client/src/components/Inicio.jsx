import './Inicio.css';

export default function Inicio() {
  return (
    <section className="hero">
      {/* Fondo de video */}
      <video className="hero-video" autoPlay muted loop playsInline>
        <source src="/dupars-bike/videoFondo.mp4" type="video/mp4" />
        Tu navegador no soporta video HTML5.
      </video>

      {/* Capa oscura para opacidad */}
      <div className="hero-overlay" />

      {/* Contenido principal */}
      <div className="hero-contenido">
        <h1>🚴‍♂️ Dupar’s Bike</h1>
        <p>Transformamos tu pedaleo en experiencia. Servicio, pasión y estilo sobre ruedas.</p>
        <div className="hero-botones">
          <a href="/formulario" className="btn21">Reservar ahora</a>
          <a href="/tienda" className="btn22">Ver tienda</a>
        </div>
      </div>
    </section>
  );
}