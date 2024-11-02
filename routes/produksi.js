const express = require('express');
const router = express.Router();
const Produksi = require('../models/Produksi');

// Endpoint untuk menampilkan semua data
router.get('/all', async (req, res) => {
    try {
        const data = await Produksi.find({});
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data" });
    }
});

// Endpoint untuk filter data
router.get('/filter', async (req, res) => {
    const { tahun, jenis, hasil } = req.query;
    try {
        const query = {};
        if (tahun) query.tahun = tahun;
        if (jenis) query.jenis = jenis;
        if (hasil) query.hasil = hasil;
        const data = await Produksi.find(query);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error filtering data" });
    }
});

// POST - Tambah data baru
router.post('/add', async (req, res) => {
    try {
        const newData = new Produksi(req.body);
        await newData.save();
        res.status(201).json(newData);
    } catch (error) {
        res.status(400).json({ message: "Error adding data" });
    }
});

// PUT - Update data berdasarkan ID
router.put('/update/:id', async (req, res) => {
    try {
        const updatedData = await Produksi.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedData);
    } catch (error) {
        res.status(400).json({ message: "Error updating data" });
    }
});

// DELETE - Hapus data berdasarkan ID
router.delete('/delete/:id', async (req, res) => {
    try {
        await Produksi.findByIdAndDelete(req.params.id);
        res.json({ message: "Data deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error deleting data" });
    }
});

module.exports = router;
