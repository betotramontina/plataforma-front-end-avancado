import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { staticProducts } from '../data/ongsData';
import logo from '../assets/logo.png';

function OngDetail() {
  const { id } = useParams();
  console.log("OngDetail Log: 1. ID da URL (string):", id); 

  console.log("OngDetail Log: 2. Conteúdo de staticProducts (DEVE ser um array de ONGs):", staticProducts); 
  
  const ong = staticProducts.find(o => o.id === parseInt(id));
  console.log("OngDetail Log: 3. ONG encontrada por find():", ong); 

  if (!ong) {
    console.log("OngDetail Log: 4. Entrou no bloco 'ONG Não Encontrada'.");
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        minHeight: '80vh', textAlign: 'center', padding: '20px'
      }}>
        <h1>ONG Não Encontrada</h1>
        <p>A ONG com o ID "{id}" não foi encontrada. Isso pode acontecer se o ID na URL estiver incorreto ou se os dados das ONGs não foram carregados.</p>
        <Link to="/products" style={{
          marginTop: '20px', padding: '10px 20px', backgroundColor: '#007bff',
          color: 'white', textDecoration: 'none', borderRadius: '5px'
        }}>
          Voltar para ONGs Parceiras
        </Link>
      </div>
    );
  }

  console.log("OngDetail Log: 5. ONG encontrada com sucesso, renderizando detalhes.");
  return (
    <div className="content-product">
      <header>
        <div className="logo">
          <img src={logo} alt="Logo da Empresa" />
        </div>
        <div className="user">
          <Link to="/">Home</Link>
        </div>
        <div className="user">
          <Link to="/products">ONGs Parceiras</Link>
        </div>
        <div className="user">
          <Link to="/contact">Seja Voluntário</Link>
        </div>
      </header>

      <section style={{
        flexGrow: 1, 
        padding: '40px 20px',
        maxWidth: '800px',
        margin: '120px auto 40px auto', 
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <img
          src={ong.image}
          alt={ong.name}
          style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', marginBottom: '20px' }}
        />
        <h2>{ong.name}</h2>
        <p style={{ fontSize: '1.1em', color: '#555', lineHeight: '1.6' }}>
          {ong.description}
        </p>
        <p style={{ fontSize: '0.9em', color: '#888' }}>
          ID da ONG: {ong.id}
        </p>
        {ong.tooltipText && (
          <p style={{ fontSize: '0.95em', color: '#666', borderTop: '1px solid #eee', paddingTop: '15px', marginTop: '20px' }}>
            Detalhe: {ong.tooltipText}
          </p>
        )}
        <Link to="/products" style={{
          display: 'inline-block', marginTop: '30px', padding: '10px 20px',
          backgroundColor: '#2fcc76', color: 'white', textDecoration: 'none',
          borderRadius: '5px', fontWeight: 'bold'
        }}>
          Voltar para as ONGs
        </Link>
      </section>

      <footer>
        <p>&copy; {new Date().getFullYear()} Dowii. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default OngDetail;
