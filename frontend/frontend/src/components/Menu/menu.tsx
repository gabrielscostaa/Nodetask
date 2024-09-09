import React from 'react';
import './menu.css';

const Menu: React.FC = () => {
  return (
    <nav className="menu">
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#Visualizar">Visualizar</a></li>
        <li><a href="#Adicionar">Adicionar Tarefa</a></li>
      </ul>
    </nav>
  );
};

export default Menu;
