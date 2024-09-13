const connection = require('./connection');

// Obtém todas as tarefas
const getAll = async () => {
    try {
        const [tasks] = await connection.execute('SELECT * FROM tasks');
        return tasks; // Retorna todos os resultados da consulta
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw new Error('Error fetching tasks'); // Lança um erro mais descritivo
    }
};

// Cria uma nova tarefa
const createTask = async (task) => {
    try {
        const { title, status = 'pendente', due_date = null, description = '' } = task;
        const query = 'INSERT INTO tasks (title, status, created_at, due_date, description,subtask) VALUES (?, ?, ?, ?, ?, ?,?)';
        const [result] = await connection.execute(query, [title, status, new Date(), due_date, description]);
        return { insertId: result.insertId };
    } catch (error) {
        console.error('Error creating task:', error);
        throw new Error('Error creating task'); // Lança um erro mais descritivo
    }
};

// Deleta uma tarefa pelo ID
const deleteTask = async (id) => {
    try {
        const [result] = await connection.execute('DELETE FROM tasks WHERE id = ?', [id]);
        return result;
    } catch (error) {
        console.error('Error deleting task:', error);
        throw new Error('Error deleting task'); // Lança um erro mais descritivo
    }
};

// Atualiza uma tarefa pelo ID
const updateTask = async (id, task) => {
    const { title, status } = task;

    // Verifica se title, status e id são definidos
    if (title === undefined || status === undefined || id === undefined) {
        throw new Error('Title, status, and id are required.');
    }

    try {
        const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?';
        const [result] = await connection.execute(query, [title, status, id]);
        return result;
    } catch (error) {
        console.error('Error updating task:', error);
        throw new Error('Error updating task'); // Lança um erro mais descritivo
    }
};

module.exports = {
    getAll,
    createTask,
    updateTask,
    deleteTask
};
