const mongoose = require('mongoose');

const produksiSchema = new mongoose.Schema({
    tahun: String,
    jenis: String,
    hasil: String
});

module.exports = mongoose.model('Produksi', produksiSchema);
