'use strict';

import Bookshelf from '../config/database';

// require('./invoice');
var Way = Bookshelf.Model.extend({
  tableName: 'ways',
  idAttribute: 'gid'
  // hasTimestamps: true,

  // invoices: function() {
  //   return this.hasMany('Invoice');
  // }
});


module.exports = Bookshelf.model('Way', Way);
