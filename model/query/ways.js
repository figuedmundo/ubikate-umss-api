'use strict';

import Bookshelf from '../../config/database';
import Way  from '../../model/way';

let Knex = Bookshelf.knex;

var getNode = (req, res) => {
  let lat = req.params.lat;
  let lon = req.params.lon;

  // let lat = -17.393759093492;
  // let lon = -66.1446482703277;

  let raw = "SELECT id FROM ways_vertices_pgr ORDER BY the_geom <-> ST_GeometryFromText('POINT(" + lon + " " + lat + ")', 4326) LIMIT 1";

  console.log(raw);

  Knex.raw(raw)
    .then((data) => {
      res.json(data.rows[0]);
    })
    .catch((error) => {
      console.log(error);
      res.send("Error");
    });
};

let getWay = (req, res) => {
  var targetId = parseInt(req.params.target);
  var sourceId = parseInt(req.params.source);

  var raw = "SELECT seq, id1 AS node, id2 AS edge, cost " +
            "FROM pgr_dijkstra('SELECT gid AS id, source::integer, target::integer, st_length(geom) AS cost " +
            "                   FROM public.ways', " + targetId + ", " + sourceId + ", false, false);";


  Knex.raw(raw)
    .then((data) => {

      let rows = data.rows;

      var edges = [];
      rows.forEach(function(row) {
          if (row.edge > 0) {
              edges.push(parseInt(row.edge));
          }
      }, this);

      // res.send(edges);
      var wayGeomQuery = "select ST_AsGeoJSON(ST_Transform(geom, 4326)) from ways where gid = 486;";

      //return Knex.raw(wayGeomQuery);
      return Knex.select(Knex.raw("ST_AsGeoJSON(ST_Transform(geom, 4326))")).from(Knex.raw("ways")).whereIn("gid", edges);
    })
    .then((data) => {

     console.log("--DATA:",data);

      var features = [];
      data.forEach(function(row) {
         var feature = {
             type: "Feature",
             geometry: JSON.parse(row.st_asgeojson)
         };

         features.push(feature);
      }, this);

      var collection = {
         type: "FeatureCollection",
         features: features
      };

      res.json(collection);

    })
    .catch((error) => {
      console.log(error);
      res.send("Error");
            });
};

//
module.exports = {
    getNode: getNode,
    getWay: getWay
};
