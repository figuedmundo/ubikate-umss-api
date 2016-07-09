'use strict';

var env = process.env.NODE_ENV || "development";
let knex = require('knex')(require('../config/knexfile')[env]);
// let knex      = require('knex')(require('../config/knexfile')["development"]);

let bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry'); // Resolve circular dependencies with relations

module.exports.bookshelf = bookshelf;
module.exports.knex = knex;
