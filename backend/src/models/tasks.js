const connection = require('./connection');


const getAll = async () => {
   const [tasks] = await connection.execute(`SELECT * FROM tasks`);
   return tasks[0];
}

const createTask = (task) => {

    const { title } = task;

    const dateUTC = new Date(Date.now()).toUTCString();

    const query = `INSERT INTO tasks (title, status, created_at) VALUES (?, ?, ?)`;

    const createTask =  connection.execute(query, [title, 'pendente', new Date()]);


}
module.exports = {
    getAll
}

