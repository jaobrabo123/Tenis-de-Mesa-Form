import { Link } from 'react-router-dom';
import './inscricao.css';

const Inscricao = () => {
  return (
    <div className="inscricao-page">
      <div className="inscricao-container">
        <div className="inscricao-header">
          <Link to="/" className="btn-voltar">← Voltar</Link>
          <h1>🏓 Formulário de Inscrição</h1>
          <p>Torneio de Ping-Pong 2026</p>
        </div>

        <form className="inscricao-form">
          {/* Dados basicos da pessoa*/}
          <fieldset>
            <legend>📋 Informações Básicas</legend>

            <div className="form-group">
              <label>Nome Completo:</label>
              <input type="text" name="nome" placeholder="Digite seu nome completo" />
            </div>

            <div className="form-group">
              <label>Data de Nascimento:</label>
              <input type="date" name="nascimento" />
              <small>Essencial para definir categorias por idade</small>
            </div>

            <div className="form-group">
              <label>E-mail de Contato:</label>
              <input type="email" name="email" placeholder="seu@email.com" />
            </div>

            <div className="form-group">
              <label>Telefone/WhatsApp:</label>
              <input type="tel" name="telefone" placeholder="(11) 91234-5678" />
            </div>
          </fieldset>

          {/* Categoria da Inscrição */}
          <fieldset>
            <legend>🎯 Categoria da Inscrição</legend>
            
            <div className="form-group">
              <label>Selecione a categoria em que deseja competir:</label>
              
              <div className="radio-group">
                <label className="radio-option">
                  <input type="radio" name="categoria" value="iniciante" />
                  <span><strong>Iniciante</strong>: Joga por lazer, não domina efeitos complexos</span>
                </label>

                <label className="radio-option">
                  <input type="radio" name="categoria" value="intermediario" />
                  <span><strong>Intermediário</strong>: Já conhece técnicas de topspin e tem bom controle</span>
                </label>

                <label className="radio-option">
                  <input type="radio" name="categoria" value="avancado" />
                  <span><strong>Avançado/Pro</strong>: Federado ou com experiência em torneios competitivos</span>
                </label>

                <label className="radio-option">
                  <input type="radio" name="categoria" value="juvenil" />
                  <span><strong>Juvenil</strong>: Até 16 anos</span>
                </label>

                <label className="radio-option">
                  <input type="radio" name="categoria" value="senior" />
                  <span><strong>Sênior</strong>: Acima de 50 anos</span>
                </label>
              </div>
            </div>
          </fieldset>

          {/* Modalidades */}
          <fieldset>
            <legend>🏆 Modalidade</legend>

            <div className="form-group">
              <div className="radio-group horizontal">
                <label className="radio-option">
                  <input type="radio" name="modalidade" value="simples" />
                  Simples (Individual)
                </label>

                <label className="radio-option">
                  <input type="radio" name="modalidade" value="duplas" />
                  Duplas
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Se escolheu duplas, informe o nome do parceiro:</label>
              <input type="text" name="parceiro" placeholder="Nome do parceiro" />
            </div>
          </fieldset>

          {/* Perfil do Jogador */}
          <fieldset>
            <legend>🎾 Perfil de Jogo <small>(Opcional, mas ajuda no chaveamento)</small></legend>

            <div className="form-group">
              <label>Mão dominante:</label>
              <div className="radio-group horizontal">
                <label className="radio-option">
                  <input type="radio" name="mao" value="destro" />
                  Destro
                </label>

                <label className="radio-option">
                  <input type="radio" name="mao" value="canhoto" />
                  Canhoto
                </label>
              </div>
            </div>
          </fieldset>

          <button type="submit" className="btn-submit">
            🏓 Confirmar Inscrição
          </button>
        </form>
      </div>
    </div>
  );
};

export default Inscricao;