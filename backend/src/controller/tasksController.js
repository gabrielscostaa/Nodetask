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

    // Verifica se o ID foi fornecido
    if (!id) {
        return response.status(400).json({ error: 'ID is required.' });
    }

    // Cria um objeto com as atualizações permitidas
    const updates = {};
    if (title !== undefined) updates.title = title;
    if (status !== undefined) updates.status = status;

    // Verifica se algum campo válido foi fornecido para atualização
    if (Object.keys(updates).length === 0) {
        return response.status(400).json({ error: 'No valid field provided for update.' });
    }

    try {
        const updatedTask = await tasks.updateTask(id, updates);
        if (!updatedTask) {
            return response.status(404).json({ error: 'Task not found.' });
        }
        return response.status(200).json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.editById = async (req, res) => {
    const { id } = req.params;
    try {
        const entity = await SomeModel.findById(id);  // Substitua SomeModel.findById pelo método correto de busca no seu banco de dados
        if (!entity) {
            return res.status(404).send('Entity not found');
        }
        res.json(entity);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const Subtask = require('../models/subtask');

exports.createSubtask = async (req, res) => {
    try {
        const { taskId, title, completed } = req.body;
        const subtask = await Subtask.create({ taskId, title, completed });
        res.status(201).json(subtask);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateSubtask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;
        const subtask = await Subtask.update({ title, completed }, { where: { id } });
        res.status(200).json(subtask);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAll,
    createTask,
    updateTask,
    deleteTask
};
