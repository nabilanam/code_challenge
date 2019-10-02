const cors = require('cors');
const express = require('express');
const database = require('./database');
const app = express();

database.connect();

app.use(cors());
app.use(express.json());
app.options('*', cors());

app.use('/api/user', require('./routes/user'));
app.use('/api/actors', require('./routes/actors'));
app.use('/api/movies', require('./routes/movies'));

app.listen(5000, () => console.log('Server started on http://localhost:5000'));
