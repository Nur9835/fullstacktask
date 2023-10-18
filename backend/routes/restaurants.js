const express= require('express');
const connection=require('../connection');
const router= express.Router();


router.get('/restaurantlist', (req, res) => {
    const sql = 'SELECT r.*, b.branch_id, b.name AS branch_name, b.working_hours, b.address AS branch_address FROM restaurants r LEFT JOIN branches b ON r.restaurant_id = b.restaurant_id';
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Restoranlar listelenirken hata oluştu: ' + error);
            res.status(500).json({ error: 'Restoranlar listelenemedi' });
        } else {
            res.status(200).json(results);
        }
    });
});


router.put('/update/:restaurant_id', (req, res) => {
    const restaurantId = req.params.restaurant_id;
    const { name, owner_email, address } = req.body;
    const updateRestaurantQuery = 'UPDATE restaurants SET  owner_email=? WHERE restaurant_id=?';
    const updateBranchQuery = 'UPDATE branches SET name=?, address=?  WHERE restaurant_id=?';

    connection.beginTransaction((err) => {
        if (err) {
            console.error(' error: ' + err);
            res.status(500).json({ error: '' });
            return;
        }
        

        connection.query(updateRestaurantQuery, [owner_email, restaurantId], (error, results) => {
            if (error) {
                console.error('Restoran bilgileri güncellenirken hata oluştu: ' + error);
                connection.rollback(() => {
                    res.status(500).json({ error: 'Restoran bilgileri güncellenemedi' });
                });
                return;
            }


            connection.query(updateBranchQuery, [name, address, restaurantId], (error, results) => {
                if (error) {
                    console.error('Şube bilgileri güncellenirken hata oluştu: ' + error);
                    connection.rollback(() => {
                        res.status(500).json({ error: 'Şube bilgileri güncellenemedi' });
                    });
                    return;
                }

                connection.commit((err) => {
                    if (err) {
                        console.error('Transaction commit error: ' + err);
                        connection.rollback(() => {
                            res.status(500).json({ error: 'Transaction could not be committed' });
                        });
                        return;
                    }

                    res.status(200).json({ message: 'Restoran bilgileri ve şube bilgileri başarıyla güncellendi' });
                });
            });
        });
    });
});



  module.exports= router;