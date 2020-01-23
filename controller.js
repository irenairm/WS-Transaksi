'use strict';

const response = require('./res');
const connection = require('./conn');

exports.users = function(req, res) {
  connection.query('SELECT * FROM transaksi', function(error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};
// Mengembalikan seluruh data transaksi pembelian film
exports.findUsers = function(req, res) {
  const idPengguna = req.params.id_pengguna;

  connection.query('SELECT * FROM transaksi where id_pengguna = ? ORDER BY jadwal_film desc, id_transaksi desc',
      [idPengguna],
      function(error, rows, fields) {
        if (error) {
          console.log(error);
        } else {
          response.ok(rows, res);
        }
      });
};

exports.createUsers = function(req, res) {
  const idPengguna = req.body.id_pengguna;

  connection.query('INSERT INTO transaksi (id_pengguna) values (?)',
      [idPengguna],
      function(error, rows, fields) {
        if (error) {
          console.log(error);
        } else {
          response.ok('Berhasil menambahkan user!', res);
        }
      });
};

// PARAMETER : idTransaksi
// Pergantian status transaksi
exports.changeStatus = function(req, res) {
  const idTransaksi = req.params.id_transaksi;
  const statusTransaksi = req.body.status_transaksi;

  connection.query(`UPDATE transaksi SET status_transaksi = ? 
      WHERE id_transaksi = ?`,
  [statusTransaksi, idTransaksi],
  function(error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      response.ok('Berhasil mengubah status!', res);
    }
  });
};

// HARUS RETURN idTransaksi
// Penambahan transaksi baru
exports.addNewTransaksi = function(req, res) {
  const idPengguna = req.params.id_pengguna;
  const noVA = req.body.no_akun_virtual;
  const idFilm = req.body.id_film;
  const jadwalFilm = req.body.jadwal_film;
  const kursi = req.body.kursi;

  connection.query(`INSERT INTO transaksi (id_pengguna, nomor_akun_virtual, 
      id_film, jadwal_film, kursi_pesanan, waktu_transaksi, 
      status_transaksi, id_transaksi)
      VALUES (?,?,?,?,?,CURRENT_TIMESTAMP(),DEFAULT,DEFAULT);`,
  [idPengguna, noVA, idFilm, jadwalFilm, kursi],
  function(error, rows) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows.insertId, res);
      // console.log(rows.insertId);
    }
  });
};
