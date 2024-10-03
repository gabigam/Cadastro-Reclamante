"use client";
import React from 'react';
import CadastroReclamante from './CadastroReclamante'; // Ajuste o caminho se necessário
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap

const CadastroPage: React.FC = () => {
  return (
    <div className="App">
      <CadastroReclamante />
    </div>
  );
};

export default CadastroPage;
