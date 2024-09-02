const connection = require('./connection');

const getAll = async () => {
    try {
        const [tasks] = await connection.execute('SELECT * FROM tasks');
        return tasks; // Retorna todos os resultados da consulta
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error; // Lança o erro para que possa ser tratado no controlador
    }
};

const createTask = async (task) => { // Renomeado de `tasks` para `task`
    try {
        const { title } = task; // Extraí o título da tarefa
        const query = 'INSERT INTO tasks (title, status, created_at) VALUES (?, ?, ?)';
        const [result] = await connection.execute(query, [title, 'pendente', new Date()]);
        return { insertId: result.insertId }; // Retorna o ID da nova tarefa
    } catch (error) {
        console.error('Error creating task:', error);
        throw error; // Lança o erro para que possa ser tratado no controlador
    }
};

module.exports = {
    getAll,
    createTask 
};
