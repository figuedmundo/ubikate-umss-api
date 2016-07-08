'use strict';

import db from '../config/database';

let Bookshelf = db.bookshelf;

// require('./invoice');
var Place = Bookshelf.Model.extend({
  tableName: 'place',
  // hasTimestamps: true,

  // invoices: function() {
  //   return this.hasMany('Invoice');
  // }
});


module.exports = Bookshelf.model('Place', Place);
