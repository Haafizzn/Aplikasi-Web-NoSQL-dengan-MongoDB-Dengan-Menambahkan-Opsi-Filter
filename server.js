const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path')
const produksiRoutes = require('./routes/produksi');

const app = express();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'views')));

mongoose.connect('mongodb://localhost:27017/dbcoba')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/api/produksi', produksiRoutes);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
