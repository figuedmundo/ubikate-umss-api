'use strict';

import Bookshelf from '../config/database';

module.exports = Bookshelf.model('User', Bookshelf.Model.extend({
    tableName: 'user',
    idAttribute: 'user_id'
}));
