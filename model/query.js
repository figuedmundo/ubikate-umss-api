'use strict';

import db from '../config/database';
import Place  from '../model/place';

let Knex = db.knex;


var getAll = (req, res) => {
  let raw = "SELECT 'place' As type " +
      "               , ST_AsGeoJSON(geom)::json As geometry " +
      "               , to_json((name)) As name " +
      "               , to_json((gid)) As id " +
      "             FROM place";

  // new Place()
  //   .fetchAll()
  //   .then((places) => {
  //     res.send(places.toJSON())
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     res.send("Error")
  //   });


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

module.exports = {
    getAll: getAll
};
