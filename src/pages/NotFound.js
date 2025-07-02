import React from 'react';

function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1>Erro 404 - Página Não Encontrada</h1>
      <p>Ops! Parece que a página que você está procurando não existe.</p>
    </div>
  );
}

export default NotFound;
