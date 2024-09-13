import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/home';
import CreateTask from './pages/Novastask/newtask';
import Menu from './components/Menu/menu'; 
import './App.css';
import './pages/Home/home.css';
import EditTaskModal from './components/Modal/modaledit/Modaledit';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <Menu /> 
        </header>
        <div className="main-content">
          <main>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/create-task" element={<CreateTask />} />
              <Route path="*" element={<div>Page Not Found</div>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
