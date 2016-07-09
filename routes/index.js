import express from 'express';
import User  from '../model/user';
import sha1 from 'sha1';
import jwt from 'jwt-simple';

const router = express.Router();

router.post('/login', function(req, res) {
    var username = req.body.username || '';
    var password = req.body.password || '';

    if (username === '' || password === '') {
        _failWithInvalidCredentials(res);
        return;
    }

    new User({
        username: username
    }).fetch().then(function(user) {
        if (user && _isValidPassword(password, user.get('password'))) {
            // If authentication is success, we will generate a token
            // and dispatch it to the client
            res.json(_genToken(user));
        } else {
            // If authentication fails, we send a 401 back
            _failWithInvalidCredentials(res);

            return;
        }
    });
});

function _failWithInvalidCredentials(res) {
    res.status(401);
    res.json({
        "status": 401,
        "message": "Invalid credentials"
    });
}

// private method
function _genToken(user) {
    var expires = _expiresIn(7);
    var token = jwt.encode({
        exp: expires,
        key: user.get('user_id')
    }, require('../config/secret')());

    return {
        user_id: user.get('user_id'),
        session_id: token
    };
}

function _expiresIn(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}

function _isValidPassword(rawPassword, encodedPassword) {
    var key = encodedPassword.substring(5, 10);
    var password = 'sha1$' + key + '$' + sha1(key + rawPassword);

    return encodedPassword == password;
}

module.exports = router;
