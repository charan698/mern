const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


router.get('/', (req, res) => {
    db.query('SELECT * FROM logs', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});


router.post('/', (req, res) => {
    const { title, description, location, date, image_url } = req.body;
    db.query(
        'INSERT INTO logs (title, description, location, date, image_url) VALUES (?, ?, ?, ?, ?)',
        [title, description, location, date, image_url],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Log added successfully', id: result.insertId });
        }
    );
});


router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM logs WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Log deleted successfully' });
    });
});

module.exports = router;
