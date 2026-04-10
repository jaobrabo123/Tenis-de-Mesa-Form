import { Link, useNavigate } from 'react-router-dom';
import './inscricao.css';
import { useState } from 'react';
import api from './api';

const Inscricao = () => {

  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [emailContato, setEmailContato] = useState('');
  const [telefone, setTelefone] = useState('');
  const [categoria, setCategoria] = useState('');
  const [modalidade, setModalidade] = useState('');
  const [maoDominante, setMaoDominante] = useState('');
  const [eviando, setEnviando] = useState(false);

  return (
    <div className="inscricao-page">
      <div className="inscricao-container">
        <div className="inscricao-header">
          <Link to="/" className="btn-voltar">← Voltar</Link>
          <h1>🏓 Formulário de Inscrição</h1>
          <p>Torneio de Tenis de Mesa 2026</p>
        </div>

        <form className="inscricao-form">
          <fieldset>
            <legend>📋 Informações Básicas</legend>

            <div className="form-group">
              <label>Nome Completo:</label>
              <input type="text" name="nome" placeholder="Digite seu nome completo" value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Data de Nascimento:</label>
              <input type="date" name="nascimento" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
              <small>Essencial para definir categorias por idade</small>
            </div>

            <div className="form-group">
              <label>E-mail de Contato:</label>
              <input type="email" name="email" placeholder="seu@email.com" value={emailContato} onChange={(e) => setEmailContato(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Telefone/WhatsApp:</label>
              <input type="tel" name="telefone" placeholder="(11) 91234-5678" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
            </div>
          </fieldset>

          <fieldset>
            <legend>🎯 Categoria da Inscrição</legend>
            
            <div className="form-group">
              <label>Selecione a categoria em que deseja competir:</label>
              
              <div className="radio-group">
                <label className="radio-option">
                  <input type="radio" name="categoria" value="INICIANTE" checked={categoria === 'INICIANTE'} onChange={(e) => setCategoria(e.target.value)} />
                  <span><strong>Iniciante</strong>: Joga por lazer, não domina efeitos complexos</span>
                </label>

                <label className="radio-option">
                  <input type="radio" name="categoria" value="INTERMEDIARIO" checked={categoria === 'INTERMEDIARIO'} onChange={(e) => setCategoria(e.target.value)} />
                  <span><strong>Intermediário</strong>: Já conhece técnicas de topspin e tem bom controle</span>
                </label>

                <label className="radio-option">
                  <input type="radio" name="categoria" value="AVANCADO" checked={categoria === 'AVANCADO'} onChange={(e) => setCategoria(e.target.value)} />
                  <span><strong>Avançado/Pro</strong>: Federado ou com experiência em torneios competitivos</span>
                </label>

                {/* <label className="radio-option">
                  <input type="radio" name="categoria" value="JUVENIL" checked={categoria === 'JUVENIL'} onChange={(e) => setCategoria(e.target.value)} />
                  <span><strong>Juvenil</strong>: Até 16 anos</span>
                </label>

                <label className="radio-option">
                  <input type="radio" name="categoria" value="SENIOR" checked={categoria === 'SENIOR'} onChange={(e) => setCategoria(e.target.value)} />
                  <span><strong>Sênior</strong>: Acima de 50 anos</span>
                </label> */}
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>🏆 Modalidade</legend>

            <div className="form-group">
              <div className="radio-group horizontal">
                <label className="radio-option">
                  <input type="radio" name="modalidade" value="SIMPLES" checked={modalidade === 'SIMPLES'} onChange={(e) => setModalidade(e.target.value)} />
                  Simples (Individual)
                </label>

                <label className="radio-option">
                  <input type="radio" name="modalidade" value="DUPLAS" checked={modalidade === 'DUPLAS'} onChange={(e) => setModalidade(e.target.value)} />
                  Duplas
                </label>
              </div>
            </div>

            {/* <div className="form-group">
              <label>Se escolheu duplas, informe o nome do parceiro:</label>
              <input type="text" name="parceiro" placeholder="Nome do parceiro" />
            </div> */}
          </fieldset>

          {/* Perfil do Jogador */}
          <fieldset>
            <legend>🎾 Perfil de Jogo <small>(Opcional, mas ajuda no chaveamento)</small></legend>

            <div className="form-group">
              <label>Mão dominante:</label>
              <div className="radio-group horizontal">
                <label className="radio-option">
                  <input type="radio" name="mao" value="DESTRO" checked={maoDominante === 'DESTRO'} onChange={(e) => setMaoDominante(e.target.value)} />
                  Destro
                </label>

                <label className="radio-option">
                  <input type="radio" name="mao" value="CANHOTO" checked={maoDominante === 'CANHOTO'} onChange={(e) => setMaoDominante(e.target.value)} />
                  Canhoto
                </label>
              </div>
            </div>
          </fieldset>

          <button type="submit" className="btn-submit" onClick={async(e)=>{
            e.preventDefault();
            if(eviando || !nome || !dataNascimento || !emailContato || !telefone || !categoria || !modalidade) return;

            setEnviando(true);

            const body = {
              nome, dataNascimento, emailContato, telefone, categoria, modalidade, maoDominante
            };

            try {
              await api.post('/cadastro', body);

              alert('Cadastro realizado com sucesso.');

              setTimeout(()=>{
                navigate('/');
              }, 500);
            } catch (err) {
              const data = err.response?.data;
              if(data){
                if(data.type === 'VS_UNPROCESSABLE_ENTITY'){
                  const fielError = data.issues[0];
                  alert(`${fielError.field}: ${fielError.message}`)
                } else {
                  alert('Erro: ' + data.error);
                }
              }
            } finally {
              setEnviando(false);
            }

          }}>
            🏓 Confirmar Inscrição
          </button>
        </form>
      </div>
    </div>
  );
};

export default Inscricao;