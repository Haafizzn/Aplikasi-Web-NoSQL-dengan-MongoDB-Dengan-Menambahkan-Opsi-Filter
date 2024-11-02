const mongoose = require('mongoose');
const Produksi = require('./models/Produksi');
const dataPanen = require('./produksi.json');

mongoose.connect('mongodb://localhost:27017/dbcoba', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database connected");
        Produksi.insertMany(dataPanen)
            .then(() => console.log("Data loaded"))
            .catch(err => console.error("Failed to load data", err))
            .finally(() => mongoose.disconnect());
    });
