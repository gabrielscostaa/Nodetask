import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateTask from '../pages/Novastask/newtask';
import Home from '../pages/Home/home'; // Exemplo de uma página inicial
import EditTask from '../pages/EditTask/EditTask';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/edit-task/:taskId" element={<EditTask />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;