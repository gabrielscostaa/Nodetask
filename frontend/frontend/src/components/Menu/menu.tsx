// src/components/Menu/menu.tsx
import React from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';

const Menu: React.FC = () => {
  const navigate = useNavigate();

  const items = [
    {
      label: 'Tasks',
      icon: 'pi pi-fw pi-list',
      command: () => navigate('/home')  // Navegação para "/home"
    },
    {
      label: 'Criar',
      icon: 'pi pi-fw pi-pencil',
      command: () => navigate('/create-task')
    },
    {
      label: 'Sobre',
      icon: 'pi pi-fw pi-info-circle',
      command: () => navigate('/about')  
    }
  ];

  return (
    <div className="menu">
      <Menubar model={items} />
    </div>
  );
};

export default Menu;
