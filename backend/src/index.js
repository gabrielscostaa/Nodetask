const express = require('express');
const router = require('./router');

const app = express();

app.use(express.json());
app.use(router);
app.use('/tasks', router); 

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

module.exports = app;