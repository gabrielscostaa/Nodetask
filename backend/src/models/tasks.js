const connection = require('./connection');


const getAll = async () => {
   const [tasks] = await connection.execute(`SELECT * FROM tasks`);
   return tasks[0];
}

const createTask = (task) => {

    const { title } = task;

    const createTask = await connection.execute(`INSERT INTO tasks (title, status, created_at) Values(?, ?, ?)`,[1, 2, 3]);
}

module.exports = {
    getAll
}

