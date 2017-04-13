'use strict';

import Bookshelf from '../config/database';
// import Place from './place';

var PlaceImage = Bookshelf.Model.extend({
  tableName: 'place_image',
  idAttribute: 'id',

  place: function() {
    return this.belongsTo('Place');
  }
});


module.exports = Bookshelf.model('PlaceImage', PlaceImage);
