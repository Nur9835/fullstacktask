const express = require('express');
const router = express.Router();
const connection = require('../connection');



router.post('/add', (req, res) => {
       const {
        name,
        email,
        phone_number,
        branch_id,
        reservation_date,
        note
      } = req.body;

      const userInsertQuery = 'INSERT INTO user (name, email, phone_number) VALUES (?, ?, ?)';
      connection.query(userInsertQuery, [name, email, phone_number], (userError, userResults) => {
        if (userError) {
          console.error('Kullanıcı eklenirken hata oluştu: ' + userError);
          return res.status(500).json({ error: 'Kullanıcı eklenirken hata oluştu' });
        }

        const userId = userResults.insertId;


        const statu = 'pending';
        const reservationInsertQuery = 'INSERT INTO reservations (user_id, branch_id, reservation_date, note, statu) VALUES (?, ?, ?, ?, ?)';
   
    

    connection.query(reservationInsertQuery, [userId, branch_id, reservation_date, note, statu], (reservationError) => {
        if (reservationError) {
          console.error('Rezervasyon eklenirken hata oluştu: ' + reservationError);
          return res.status(500).json({ error: 'Rezervasyon eklenirken hata oluştu' });
        }
        res.status(201).json({ message: 'Rezervasyon başarıyla oluşturuldu' 
    });
      });

    });


  });




// Rezervasyonları onaylama
router.put('/approve/:reservationId', (req, res) => {
  const reservationId = req.params.reservationId;
  const sql = 'UPDATE reservations SET statu=? WHERE reservation_id=?';
  connection.query(sql, ['approved', reservationId], (error, results) => {
      if (error) {
          console.error('Rezervasyon onaylanırken hata oluştu: ' + error);
          res.status(500).json({ error: 'Rezervasyon onaylanamadı' });
      } else {
          res.status(200).json({ message: 'Rezervasyon başarıyla onaylandı' });
      }
  });
});


// Rezervasyonları reddetme 
router.put('/reject/:reservationId', (req, res) => {
  const reservationId = req.params.reservationId;
  const sql = 'UPDATE reservations SET statu=? WHERE reservation_id=?';
  connection.query(sql, ['rejected', reservationId], (error, results) => {
      if (error) {
          console.error('Rezervasyon reddedilirken hata oluştu: ' + error);
          res.status(500).json({ error: 'Rezervasyon reddedilemedi' });
      } else {
          res.status(200).json({ message: 'Rezervasyon başarıyla reddedildi' });
      }
  });
});

  

//reservations table+ user table 
router.get('/list', (req, res) => {
  const sql = 'SELECT r.*, u.name AS user_name, u.email AS user_email, u.phone_number AS user_phone FROM reservations r JOIN user u ON r.user_id = u.user_id';
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Rezervasyonlar listelenirken hata oluştu: ' + error);
            res.status(500).json({ error: 'Rezervasyonlar listelenemedi' });
        } else {
            res.status(200).json(results);
        }
    });
    
});




router.get('/getBranchById/:branchId', (req, res) => {
  const branchId = req.params.branchId;
  const query = 'SELECT * FROM branches WHERE branch_id = ?';

  connection.query(query, [branchId], (error, results) => {
    if (error) {
      console.error('Şube alınırken hata oluştu: ' + error);
      return res.status(500).json({ error: 'Şube alınamadı' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Şube bulunamadı' });
    }

    const branch = results[0];
    res.status(200).json(branch);
  });
});


//seçilen tarihteki rezarvasyonları listeleme
router.get('/listDate/:date', (req, res) => {
  const date = req.params.date;
  const query = 'SELECT * FROM reservations WHERE DATE(reservation_date) = ?';
  connection.query(query, [date], (error, results) => {
    if (error) {
      console.error('Rezervasyonlar alınırken hata oluştu: ' + error);
      return res.status(500).json({ error: 'Rezervasyonlar alınamadı' });
    }
    res.status(200).json(results);
  });
});



module.exports = router;
