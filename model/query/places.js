'use strict';

import Bookshelf from '../../config/database';
import Place from '../../model/place';

let Knex = Bookshelf.knex;


var getAll = (req, res) => {
  let raw = `SELECT 'place' As type
                       , ST_AsGeoJSON(p.geom)::json As geometry
                       , to_json((p.name)) As name
                       , to_json((p.gid)) As id
                       , p.description
                       , p.phone
                       , p.level
                       , (string_agg(i.cloudinary_public_id, ',')) as images
                FROM place p
                LEFT JOIN place_images i ON p.gid = i.place_id
                GROUP BY p.gid;`;

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
  // (string_agg(i.cloudinary_public_id, ',')) as images
  // GROUP BY p.gid
  var raw = `SELECT
         ST_AsGeoJSON(p.geom)::json As geometry,
         p.name,
         p.description,
         p.phone,
         p.level,
         p.gid As id,
         (string_agg(i.cloudinary_public_id, ',')) as images
         FROM place p
         LEFT JOIN place_images i ON p.gid = i.place_id
         WHERE p.gid = ${id}
         GROUP BY p.gid;`;

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

  var raw = `SELECT
         ST_AsGeoJSON(p.geom)::json As geometry,
         p.name,
         p.description,
         p.phone,
         p.level,
         p.gid As id,
         (string_agg(i.cloudinary_public_id, ',')) as images
         FROM place p
         LEFT JOIN place_images i ON p.gid = i.place_id
         WHERE LOWER(p.name) like LOWER('%${name}%')
         GROUP BY p.gid;`;
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

var visitedCount = (req, res) => {
  console.log("**************visited ******************************");
  Place.forge()
    .where('visit_count', '>', '1')
    .orderBy('visit_count', 'DESC')
    .query((qb) => qb.limit(10))
    .fetchAll({
      columns: ["name as label", "visit_count as value"]
    })
    .then((visited) => {
      if (visited) {
        res.json(visited.toJSON());
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

var updatePlaceVisited = (req, res) => {
  var id = req.params.id;

  Place.forge({
      gid: id
    })
    .fetch({
      columns: "visit_count"
    })
    .then((visited) => {
      let count = (visited.attributes.visit_count) || 0;
      Place.forge({
          gid: id
        })
        .save({
          visit_count: count + 1
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

    })
    .catch((err) => {
      res.status(500).json({
        message: err.message
      });
    });
};

module.exports = {
  getAll: getAll,
  getPlace: getPlace,
  newPlace: newPlace,
  editPlace: editPlace,
  getPlacesByName: getPlacesByName,
  visitedCount: visitedCount,
  updatePlaceVisited: updatePlaceVisited
};