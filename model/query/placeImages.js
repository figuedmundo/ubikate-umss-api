'use strict';

import Bookshelf from '../../config/database';
import PlaceImage from '../../model/placeImage';


var getImages = (req, res) => {
    var place_id = req.params.place_id;

    PlaceImage.forge({
            place_id: place_id
        })
        .fetch()
        .then((placeImages) => {
            if (placeImages) {
                res.json(placeImages.toJSON());
            } else {
                res.status(404).json({});
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message
            });
        });
};


function _failWithDataEmpty(res) {
    res.status(401);
    res.json({
        "status": 401,
        "message": "The place name and the coords should not be empty"
    });
}

var newImage = (req, res) => {
    var place_id = req.body.place_id || '';
    var cloudinary_public_id = req.body.cloudinary_public_id || '';

    if (place_id === '' || cloudinary_public_id === '') {
        _failWithInvalidCredentials(res);
        return;
    }

    PlaceImage.forge()
        .save({
            place_id: place_id,
            cloudinary_public_id: cloudinary_public_id
        })
        .then(function(image) {
            if (image) {
                res.json(image.toJSON());
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


function _failWithInvalidCredentials(res) {
    res.status(401);
    res.json({
        "status": 401,
        "message": "Invalid credentials"
    });
}

//
module.exports = {
    newImage: newImage,
    getImages: getImages
};
