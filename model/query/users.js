'use strict';

import Bookshelf from '../../config/database';
import User from '../../model/user';
import sha1 from 'sha1';

let Knex = Bookshelf.knex;


var getUser = (req, res) => {
    var id = req.params.id;

    User.forge({
            user_id: req.params.id
        })
        .fetch()
        .then(function(user) {
            if (user) {
                res.json(user.toJSON());
            } else {
                res.status(404).json({});
            }
        })
        .catch(function(err) {
            res.status(500).json({
                message: err.message
            });
        });
};

var newUser = (req, res) => {
    var username = req.body.username || '';
    var password = req.body.password || '';

    if (username === '' || password === '') {
        _failWithInvalidCredentials(res);
        return;
    }

    var passwordSecret = _encodePassword(password);

    User.forge()
        .save({
            username: username,
            password: passwordSecret
        })
        .then(function(user) {
            if (user) {
                res.json(user.toJSON());
            } else {
                res.status(404).json({});
            }
        })
        .catch(function(err) {
            res.status(500).json({
                message: err.message
            });
        });
};

function _encodePassword(password) {
    return sha1(require('../../config/secret')() + password);
}


function _failWithInvalidCredentials(res) {
    res.status(401);
    res.json({
        "status": 401,
        "message": "Invalid credentials"
    });
}
//
module.exports = {
    getUser: getUser,
    newUser: newUser
};
