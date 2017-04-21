'use strict';

import Bookshelf from '../config/database';
// import Place from './place';

var PlaceImages = Bookshelf.Model.extend({
  tableName: 'place_images',
  idAttribute: 'id',

  place: function() {
    return this.belongsTo('Place');
  }
});


module.exports = Bookshelf.model('PlaceImages', PlaceImages);
