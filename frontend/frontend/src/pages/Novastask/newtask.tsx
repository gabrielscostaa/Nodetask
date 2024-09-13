import React, { useState } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import Menu from '../../components/Menu/menu';
import './newcss.css'; 

const CreateTask: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const toast = React.useRef<Toast>(null);

  const statusOptions = [
    { label: 'In-Progress', value: 'in-progress' },
    { label: 'Completed', value: 'completed' },
    { label: 'Pending', value: 'pending' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3333/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, status, description, dueDate }),
      });
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const result = await response.json();
      setSuccess('Task created successfully!');
      toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Task created successfully!', life: 3000 });
    } catch (error) {
      setError('There was a problem creating the task.');
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'There was a problem creating the task.', life: 3000 });
    }
  };

  return (
    <PrimeReactProvider>
      <Toast ref={toast} />
      <div className="app">
        <Menu />
        <div className="main-content">
          <main className="create-task-container">
            <h1>Create Task</h1>
            <form onSubmit={handleSubmit} className="p-fluid">
              <div className="p-field">
                <label htmlFor="title">Title</label>
                <InputText id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="p-field">
                <label htmlFor="status">Status</label>
                <Dropdown id="status" value={status} options={statusOptions} onChange={(e) => setStatus(e.value)} placeholder="Select a Status" required />
              </div>
              <div className="p-field">
                <label htmlFor="description">Description</label>
                <InputTextarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={5} required />
              </div>
              <div className="p-field">
                <label htmlFor="dueDate">Due Date</label>
                <Calendar id="dueDate" value={dueDate} onChange={(e) => setDueDate(e.value)} showIcon />
              </div>
              <Button label="Save Task" icon="pi pi-check" className="p-button-success" />
            </form>
          </main>
        </div>
      </div>
    </PrimeReactProvider>
  );
};

export default CreateTask;
