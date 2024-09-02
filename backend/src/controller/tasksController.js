const tasks = require('../models/tasks');

const getAll = async (request, response) => {
    try {
        const tasklist = await tasks.getAll(); // Recupera a lista de tarefas
        return response.status(200).json({ tasks: tasklist }); // Retorna a lista de tarefas
    } catch (error) {
        console.error('Error retrieving tasks:', error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
};

const createTask = async (request, response) => {
    try {
        const newTask = await tasks.createTask(request.body); // Cria uma nova tarefa
        return response.status(201).json(newTask); // Retorna o ID da nova tarefa
    } catch (error) {
        console.error('Error creating task:', error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAll,
    createTask
};
