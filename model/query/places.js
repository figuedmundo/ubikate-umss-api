'use strict';

import Bookshelf from '../../config/database';
import Place from '../../model/place';

let Knex = Bookshelf.knex;


var getAll = (req, res) => {
    let raw = "SELECT 'place' As type " +
        "               , ST_AsGeoJSON(geom)::json As geometry " +
        "               , to_json((name)) As name " +
        "               , to_json((gid)) As id " +
        "               , description " +
        "               , phone " +
        "               , level " +
        "        FROM place";

    Knex.raw(raw)
        .then(function(places) {
            res
                .status(200)
                .json({
                    status: 'success',
                    data: places.rows,
                    message: 'Retrieved ALL Places'
                });
        })
        .catch(function(error) {
            console.log(error);
            res.send('An error occured');
        });

};

var getPlace = (req, res) => {
    var id = req.params.id;

    var raw = "SELECT " +
        " ST_AsGeoJSON(geom)::json As geometry," +
        " name," +
        " description," +
        " phone," +
        " level," +
        " gid As id " +
        " FROM place WHERE gid = " + id;

    Bookshelf.knex.raw(raw)
        .then((data) => {
            res.json(data.rows[0]);
        })
        .catch((error) => {
            console.log(error);
            res.send("Error");
        });
};

var getPlacesByName = (req, res) => {
    // var id = req.params.id;
    var name = req.params.name;

    var raw = "SELECT " +
        " ST_AsGeoJSON(geom)::json As geometry," +
        " name," +
        " description," +
        " phone," +
        " level," +
        " gid As id " +
        " FROM place WHERE LOWER(name) like LOWER('%" + name + "%')";

    Bookshelf.knex.raw(raw)
        .then((places) => {
          res
              .status(200)
              .json({
                  status: 'success',
                  data: places.rows,
                  message: 'Retrieved ALL Places where name contains: ' + name
              });
        })
        .catch((error) => {
            console.log(error.message);
            res.send("Error: ", error.message);
        });
};

var newPlace = (req, res) => {
    var name = req.body.name || '';
    var lat = req.body.lat || '';
    var lon = req.body.lon || '';

    var description = req.body.description || '';
    var phone = req.body.phone || '';
    var level = req.body.level || '';


    if (name === '' || lat === '' || lon === '') {
        _failWithDataEmpty(res);
        return;
    }

    if (level === '') {
        level = 0;
    }

    let raw = `insert into place (name, geom, description, phone, level)
              values ('${name}',
                      ST_GeomFromText('POINT(${lon} ${lat})', 4326),
                      '${description}',
                      '${phone}',
                      '${level}'
                     );`;

    console.log(raw);

    Knex.raw(raw)
        .then(function(data) {
            console.log(data);
            res.json({
                "message": "Place saved successfully!",
                "data": data
            });
        })
        .catch(function(error) {
            console.log(error);
            res.send("Error: ", error);
        });
};

function _failWithDataEmpty(res) {
    res.status(401);
    res.json({
        "status": 401,
        "message": "The place name and the coords should not be empty"
    });
}

var editPlace = (req, res) => {
    var id = req.params.id;
    var name = req.body.name || '';
    // var lat = req.body.lat || '';
    // var lon = req.body.lon || '';

    var description = req.body.description || '';
    var phone = req.body.phone || '';
    var level = req.body.level || '';


    if (name === '' || id === '') {
        _failWithDataEmpty(res);
        return;
    }

    if (level === '') {
        level = 0;
    }

    Place.forge({
            gid: id
        })
        .save({
            name: name,
            description: description,
            phone: phone,
            level: level
        }, {
            patch: true
        })
        .then(function(model) {
            // ...
            res.json({
                "message": "Place updated successfully!",
                "data": model
            });
        })
        .catch(function(err) {
            res.status(500).json({
                error: true,
                data: {
                    message: err.message
                }
            });
        });
};


//     .fetch({require: true})
//     .then(function(place) {
//       place.save({
//         name: name || place.get('name'),
//         description: description || place.get('description'),
//         phone: phone || place.get('phone'),
//         level: level || place.get('level'),
//
//       })
// };
//
module.exports = {
    getAll: getAll,
    getPlace: getPlace,
    newPlace: newPlace,
    editPlace: editPlace,
    getPlacesByName: getPlacesByName
};
