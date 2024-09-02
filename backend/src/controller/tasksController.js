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

const deleteTask = async (request, response) => {
    const { id } = request.params;

    await tasks.deleteTask(id);
    return response.status(204).json();
}
const updateTask = async (request, response) => {
    const { id } = request.params;
    const { title, status } = request.body;

    // Verifica se title, status e id estão definidos
    if (!title || !status || !id) {
        return response.status(400).json({ error: 'Title, status, and id are required.' });
    }

    try {
        await tasks.updateTask(id, { title, status });
        return response.status(204).json();
    } catch (error) {
        console.error('Error updating task:', error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports = {
    getAll,
    createTask,
    updateTask,
    deleteTask
};
