import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Task {
  id: number;
  title: string;
}

const EditTask: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Pega o ID da URL
  const [task, setTask] = useState<Task | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState<string>('');
  const navigate = useNavigate();

  const fetchTask = async () => {
    try {
      const response = await fetch(`http://localhost:3333/tasks/${id}`);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      setTask(data.task);
      setNewTitle(data.task.title); // Define o título atual no estado
    } catch (error) {
      setError('There has been a problem with your fetch operation.');
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3333/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTitle }),
      });
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      navigate('/'); // Redireciona para a lista de tarefas após a edição
    } catch (error) {
      setError('There has been a problem with your update operation.');
    }
  };

  return (
    <div className="edit-task">
      <h1>Edit Task</h1>
      {error && <p className="error-message">{error}</p>}
      {task ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Task Title:</label>
          <input
            id="title"
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button type="submit">Save Changes</button>
        </form>
      ) : (
        <p>Loading task...</p>
      )}
    </div>
  );
};

export default EditTask;
