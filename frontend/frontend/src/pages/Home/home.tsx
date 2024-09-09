import React, { useState, useEffect } from 'react';
import './home.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

interface Task {
  id: number;
  title: string;
  status: string;
  description: string;
  dueDate: string;
}

interface ApiResponse {
  tasks: Task[];
}

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:3333/tasks')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: ApiResponse) => {
        console.log('Data fetched:', data); // Adicione este log
        if (Array.isArray(data.tasks)) {
          setTasks(data.tasks);
        } else {
          console.error('Expected an array of tasks but got:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
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

  const actionTemplate = (rowData: Task) => {
    return (
      <div>
        <button className="p-button p-button-info p-button-sm">Edit</button>
        <button className="p-button p-button-danger p-button-sm">Delete</button>
      </div>
    );
  };

  return (
    <PrimeReactProvider>
      <div className="app">
        <header className="header">
          {/* Conteúdo do cabeçalho */}
        </header>
        <div className="main-content">
          <aside className="menu">
            <ul>
              <li><a href="#">Dashboard</a></li>
              <li><a href="#">Tasks</a></li>
              <li><a href="#">Settings</a></li>
            </ul>
          </aside>
          <main className="tasks-container">
            {loading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}
            {!loading && !error && (
              <DataTable value={tasks} paginator rows={10} dataKey="id" header={header} footer={footer}>
                <Column field="title" header="Title" sortable filter filterPlaceholder="Search by title" />
                <Column field="status" header="Status" sortable filter filterPlaceholder="Search by status" />
                <Column field="description" header="Description" />
                <Column field="dueDate" header="Due Date" sortable />
                <Column body={actionTemplate} headerClassName="w-10rem" />
              </DataTable>
            )}
          </main>
        </div>
      </div>
    </PrimeReactProvider>
  );
};

export default Home;
