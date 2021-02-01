
const router = require('./config/routes/api/users')
const express = require('express');

const connectDB = require('./config/db');


const app = express();

connectDB();

app.use(express.json({extended:false}))


app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;

app.use('/api/users', router)

app.listen(PORT, () => console.log(`server start on  port${PORT}`));

