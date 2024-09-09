const express = require('express');
const router = require('./router');
const cors = require('cors'); // Adicionar importação do CORS
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors()); 
app.use(express.json());

app.use('/tasks', router);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

module.exports = app;
