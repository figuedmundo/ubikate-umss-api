"use strict";

import jwt from 'jwt-simple';
import User  from '../model/user';
import secret from '../config/secret.js';

module.exports = function(req, res, next) {

    // When performing a cross domain request, you will recieve
    // a preflighted request first. This is to check if our the app
    // is safe.

    // We skip the token outh for [OPTIONS] requests.
    //if(req.method == 'OPTIONS') next();

    var token = (req.body && req.body.session_id) || (req.query && req.query.session_id) || req.headers['session_id'];

    if (token) {
        try {
            var decoded = jwt.decode(token, secret());

            if (decoded.exp <= Date.now()) {
                _failWithError(res, 400, "Session Expired", {});
                return;
            }

            new User({
                user_id: decoded.key
            }).fetch().then(function(user) {
                // The key would be the logged in user's username
                if (user) {
                    next(); // To move to next middleware
                } else {
                    // No user with this name exists, respond back with a 401
                    _failWithError(res, 401, "Invalid User", {});
                    return;
                }
            });

        } catch (err) {
            console.log(err);
            _failWithError(res, 500, "Oops something went wrong", err);
        }
    } else {
        _failWithError(res, 401, "Invalid session id or key", {});
        return;
    }
};

function _failWithError(res, code, message, err) {
    res.status(code);
    res.json({
        "code": code,
        "message": message,
        "error": err
    });
}
