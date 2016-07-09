'use strict';

var env = process.env.NODE_ENV || "development";
let knex = require('knex')(require('../knexfile')[env]);

let bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry'); // Resolve circular dependencies with relations

module.exports = bookshelf;
module.exports.knex = knex;
