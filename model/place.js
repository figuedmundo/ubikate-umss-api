'use strict';

import Bookshelf from '../config/database';
// import PlaceImage from './placeImage';

var Place = Bookshelf.Model.extend({
  tableName: 'place',
  idAttribute: 'gid',

  images: function() {
    return this.hasMany('PlaceImages');
  }
});


module.exports = Bookshelf.model('Place', Place);
