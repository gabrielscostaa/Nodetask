// src/pages/Home/home.tsx
import React, { useState, useEffect } from 'react';
import './home.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Menu from '../../components/Menu/menu';
import '../../components/Menu/menu.css';
import { Modal } from '../../components/Modal/modal'; // Ajuste o caminho conforme necessário
import { useNavigate } from 'react-router-dom';
import EditTaskModal from '@components/Modal/modaledit/Modaledit';

interface Task {
  id: number;
  title: string;
  status: string;
  description: string;
  dueDate: string;
  subtasks: { title: string; completed: boolean }[]; 

}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3333/tasks')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setTasks(data.tasks);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
        setError('Failed to load tasks');
        setLoading(false);
      });
  }, []);

  const header = (
    <div className="table-header">
      Task Management
    </div>
  );

  const footer = (
    <div className="table-footer">
      Total Tasks: {tasks.length}
    </div>
  );


  const openModal = (task: Task) => {
    console.log(task); 
    setSelectedTask(task);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const actionTemplate = (rowData: Task) => {
    return (
      <div className="button-row">
        <button className="p-button p-button-info p-button-sm" onClick={() => openModal(rowData)}>View</button>
        <button className="p-button p-button-warning p-button-sm" onClick={() => handleEditTask(rowData.id)}>Edit</button>
      </div>
    );
  };

  const handleEditTask = (taskId) => {
    setCurrentTaskId(taskId);
    setEditModalVisible(true);
  };

  const handleCloseModal = () => {
    setEditModalVisible(false);
  };

  return (
    <PrimeReactProvider>
      <div className="app">
        <Menu /> 
        <div className="main-content">
          <main className="tasks-container">
            {loading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}
            {!loading && !error && (
             <DataTable value={tasks} paginator rows={10} dataKey="id" header={header} footer={footer}>
             <Column field="id" header="ID" />
             <Column field="title" header="Title" sortable filter filterPlaceholder="Search by title" />
             <Column field="status" header="Status" sortable filter filterPlaceholder="Search by status" />
             <Column field="description" header="Description" />
             <Column body={actionTemplate} header="Actions" />  
           </DataTable>
            )}
            {selectedTask && (
              <Modal isOpen={isModalOpen} onClose={closeModal} task={selectedTask} />
            )}
            {currentTaskId && (
              <EditTaskModal
                taskId={currentTaskId}
                visible={isEditModalVisible}
                onHide={handleCloseModal}
              />
            )}
          </main>
        </div>
      </div>
    </PrimeReactProvider>
  );
};

export default Home;
