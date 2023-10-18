const express = require('express');
const router = express.Router();
const connection = require('../connection');


router.post('/add', (req, res) => {
    const { name, email, phone_number } = req.body;
    const sql = 'INSERT INTO user (name, email, phone_number) VALUES (?, ?, ?)';
    connection.query(sql, [name, email, phone_number], (error, results) => {
        if (error) {
            console.error('Kullanıcı eklenirken hata oluştu: ' + error);
            res.status(500).json({ error: 'Kullanıcı eklenemedi' });
        } else {
            res.status(201).json({ message: 'Kullanıcı başarıyla eklendi' });
        }
    });
});



module.exports = router;
