const express = require('express');

const connectDB = require('./config/db');

const app = express();

connectDB();

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;

app.use('/api/users', require('./config/routes/api/users'))

app.listen(PORT, () => console.log(`server start on  port${PORT}`));

