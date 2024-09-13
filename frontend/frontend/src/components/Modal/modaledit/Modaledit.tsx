import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import './EditTask.css';

const EditTaskModal = ({ taskId, visible, onHide }) => {
  const [task, setTask] = useState({
    title: '',
    status: '',
    description: '',
    dueDate: new Date()
  });

  useEffect(() => {
    fetch(`http://localhost:3333/tasks/${taskId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch task with ID ${taskId}: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        // Manipular dados
      })
      .catch(error => {
        console.error('Error fetching task:', error);
      });
  }, [taskId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3333/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Task updated successfully!');
      onHide(); // Fechar o modal após a atualização
      window.location.reload(); // Adiciona esta linha para recarregar a página
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <Dialog header="Edit Task" visible={visible} style={{ width: '50vw' }} onHide={onHide} className="p-fluid">
      <form onSubmit={handleSubmit} className="p-fluid">
        <div className="p-field p-grid">
          <label htmlFor="title" className="p-col-11 p-md-2">Title:</label>
          <div className="p-col-11 p-md-9">
            <InputText id="title" name="title" value={task.title} onChange={handleInputChange} required />
          </div>
        </div>
        <div className="p-field p-grid">
          <label htmlFor="status" className="p-col-11 p-md-2">Status:</label>
          <div className="p-col-11 p-md-9">
            <Dropdown id="status" name="status" value={task.status} options={[{label: 'Pending', value: 'pending'}, {label: 'In Progress', value: 'in-progress'}, {label: 'Completed', value: 'completed'}]} onChange={handleInputChange} required />
          </div>
        </div>
        <div className="p-field p-grid">
          <label htmlFor="description" className="p-col-12 p-md-2">Description:</label>
          <div className="p-col-11 p-md-9">
            <InputTextarea id="description" name="description" value={task.description} onChange={handleInputChange} rows={5} required />
          </div>
        </div>
        <div className="p-field p-grid">
          <label htmlFor="dueDate" className="p-col-12 p-md-2">Due Date:</label>
          <div className="p-col-12 p-md-10">
            <Calendar id="dueDate" name="dueDate" value={task.dueDate} onChange={handleInputChange} showIcon />
          </div>
        </div>
        <Button label="Update Task" icon="pi pi-check" type="submit" className="p-mt-2" />
      </form>
    </Dialog>
  );
};

export default EditTaskModal;