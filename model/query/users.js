'use strict';

import Bookshelf from '../../config/database';
import User  from '../../model/user';

let Knex = Bookshelf.knex;


var getUser = (req, res) => {
  var id = req.params.id;

  User.forge({user_id: req.params.id})
    .fetch()
    .then(function (user) {
      if (user) {
        res.json(user.toJSON());
      }
      else {
        res.status(404).json({});
      }
    })
    .catch(function (err) {
      res.status(500).json({message: err.message});
    });
};

//
module.exports = {
    getUser: getUser
};
