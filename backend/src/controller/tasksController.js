const tasks = require('../models/tasks');



const getAll = async (req, res) => {

    const taskss = await tasks.getAll();

 return res.status(200).json({ taskss });

};



module.exports = {
    getAll
}
