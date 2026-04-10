import { Link } from 'react-router-dom';
import './app.css';
import { useEffect, useState } from 'react';
import api from './api';

function App() {

  const [vagasDisponiveis, setVagasDisponiveis] = useState(null);

  useEffect(()=>{
    async function carregarVagasDisponiveis() {
      try {
        const response = await api('/cadastro/disponiveis');
        console.log(response)
        setVagasDisponiveis(response.data?.data?.vagasDisponiveis ?? 0);
      } catch (err) {
        console.error(err.response?.data)
        setVagasDisponiveis(0);
      } 
    }

    carregarVagasDisponiveis()
  }, []);

  return (
    <>     
      <section id="hero" style={{ position: 'relative', minHeight: '480px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderRadius: '12px', background: '#04002b5f' }}> 
        <img src="https://i.imgur.com/ChqkneB.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} /> 

        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '3rem 2rem' }}>
          <div style={{ fontSize: '40px', marginBottom: '1rem' }}>TORNEIO JOVEN TECH</div>
          <span className="badge">Inscrições abertas</span>
          <h1>TÊNIS <span style={{ color: '#5a860179' }}>DE MESA</span></h1>
          <p>Mostre suas habilidades na mesa e dispute o título de campeão do CajuHub</p>
          <Link to="/inscricao" className="btn-primary">Inscreva-se agora →</Link>
        </div>
      </section>

      <section id="stats">
        <div className="stat-card"><span className="num">{vagasDisponiveis}</span><span className="label">Vagas disponíveis</span></div>
        <div className="stat-card"><span className="num">18/04</span><span className="label">Data do evento</span></div>
        <div className="stat-card"><span className="num">4h</span><span className="label">De Duração</span></div>
      </section>

      <section id="info">
        <h2>Informações do torneio</h2>
        <div className="info-grid">
          <div className="info-card"><h3>📍 Local</h3><p>CajuHub - Projeto JovenTech</p></div>
          <div className="info-card"><h3>📅 Data e horário</h3><p>18 de abril de 2026, a partir das 19h</p></div>
          <div className="info-card"><h3>🎯 Formato</h3><p>Fase de grupos + mata-mata, simples e duplas</p></div>
          <div className="info-card"><h3>💰 Taxa de inscrição</h3><p>100% gratuito</p></div>
        </div>
      </section>

      <section id="cta">
        <h2>Pronto para competir?</h2>
        <p>As vagas são limitadas.</p>
        <Link to="/inscricao" className="btn-primary">Acessar página de inscrição</Link>
        <p className="note">Inscrições encerram em 11 abril de 2026</p>
      </section>
    </>
  );
}

export default App;