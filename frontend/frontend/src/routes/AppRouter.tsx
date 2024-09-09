// src/routes/AppRouter.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/home'; // Ajuste o caminho conforme necessário
import EditTask from '../pages/Edita/edit';

const AppRouter: React.FC = () => (
  <Routes>
    <Route path="/Home" element={<Home />} />
    <Route path="/edit/:id" element={<EditTask />} />
    {/* Adicione outras rotas conforme necessário */}
  </Routes>
);

export default AppRouter; // Certifique-se de que está exportando AppRouter como exportação padrão
