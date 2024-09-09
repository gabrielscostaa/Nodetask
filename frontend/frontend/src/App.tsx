// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home/home'; 
import EditTask from './pages/Edita/edit'; 
import './App.css';
import './pages/Home/home.css';


const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <h1>Task Manager</h1>
        </header>
        <div className="main-content">
          <div className="menu">
            <h2>Menu</h2>
            <ul>
              <li><Link to="/home">Tasks</Link></li> {/* Usando Link para navegação */}
              <li><Link to="/edit/:id">Editar</Link></li> {/* Corrigido com Link */}
              <li><Link to="/about">Sobre</Link></li> {/* Outra rota, se houver */}
            </ul>
          </div>
          <main>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/edit/:id" element={<EditTask />} /> {/* Rota com parâmetro dinâmico */}
              {/* Adicione outras rotas conforme necessário */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;