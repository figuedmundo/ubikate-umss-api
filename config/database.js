'use strict';

// let knex      = require('knex')(require('../config/knexfile')[process.env.NODE_ENV]);
let knex      = require('knex')(require('../config/knexfile')["development"]);

let bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry'); // Resolve circular dependencies with relations

module.exports.bookshelf = bookshelf;
module.exports.knex = knex;
