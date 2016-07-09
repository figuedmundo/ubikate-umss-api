'use strict';

import Bookshelf from '../config/database';

// require('./invoice');
var Place = Bookshelf.Model.extend({
  tableName: 'place',
  idAttribute: 'gid'
  // hasTimestamps: true,

  // invoices: function() {
  //   return this.hasMany('Invoice');
  // }
});


module.exports = Bookshelf.model('Place', Place);
