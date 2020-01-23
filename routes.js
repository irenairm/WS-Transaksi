'use strict';

module.exports = function(app) {
  const todoList = require('./controller');

  app.route('/users')
      .get(todoList.users);

  app.route('/users/:id_pengguna')
      .get(todoList.findUsers);

  app.route('/users')
      .post(todoList.createUsers);

  app.route('/users/:id_transaksi')
      .put(todoList.changeStatus);

  app.route('/users/:id_pengguna')
      .post(todoList.addNewTransaksi);
};
