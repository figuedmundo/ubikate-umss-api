'use strict';

import db from '../config/database';

let Bookshelf = db.bookshelf;

module.exports = Bookshelf.model('User', Bookshelf.Model.extend({
    tableName: 'user',
    idAttribute: 'user_id'
}));
