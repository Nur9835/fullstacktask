const express = require('express');
const router = express.Router();
const connection = require('../connection');


router.put('/update/:branch_id', (req, res) => {
    const branchId = req.params.branch_id;
    const { name, working_hours, address } = req.body;
    const sql = 'UPDATE branches SET name=?, working_hours=?, address=? WHERE branch_id=?';
    connection.query(sql, [name, working_hours, address, branchId], (error, results) => {
        if (error) {
            console.error('Şube bilgileri güncellenirken hata oluştu: ' + error);
            res.status(500).json({ error: 'Şube bilgileri güncellenemedi' });
        } else {
            res.status(200).json({ message: 'Şube bilgileri başarıyla güncellendi' });
        }
    });
});


router.get('/list', (req, res) => {
    const sql = 'SELECT * FROM branches';
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Şubeler listelenirken hata oluştu: ' + error);
            res.status(500).json({ error: 'Şubeler listelenemedi' });
        } else {
            res.status(200).json(results);
        }
    });
});

module.exports = router;
