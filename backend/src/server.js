const app = require('./index');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
