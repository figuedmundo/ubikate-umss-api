'use strict';

import Bookshelf from '../../config/database';
import Way from '../../model/way';

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

            // gets the lines that are the shortes route
            return Knex.select(Knex.raw("ST_AsGeoJSON(ST_Transform(geom, 4326)), ST_Length(geom::geography) as distance")).from(Knex.raw("ways")).whereIn("gid", edges);
        })
        .then((data) => {

            console.log("--DATA:", data);

            var features = [];
            var distance = 0;
            data.forEach(function(row) {
                var feature = {
                    type: "Feature",
                    geometry: JSON.parse(row.st_asgeojson)
                };
                distance += row.distance;
                features.push(feature);
            }, this);

            var collection = {
                type: "FeatureCollection",
                features: features,
                distance: getDistance(distance),
                time: getTime(distance)
            };

            res.json(collection);

        })
        .catch((error) => {
            console.log(error);
            res.send("Error");
        });
};

let getTime = (distance) =>{
  return Math.round(((distance * 3) / 250) * 100 ) / 100;
};

let getDistance = (distance) =>{
  return Math.round(distance * 100 ) / 100;
};

//
module.exports = {
    getNode: getNode,
    getWay: getWay
};
