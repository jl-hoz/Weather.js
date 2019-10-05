"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.localization = void 0;

var _request = _interopRequireDefault(require("request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var localization = function localization(argv) {
  var baseURLMap = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
  var tokenMap = 'pk.eyJ1Ijoiamxob3oiLCJhIjoiY2sxYW8yN3IyMDE0ODNjb2JqaG5jYzRjOSJ9.Adhcrl_QfmujWayhu7ABjA';
  var endpointMap = "".concat(baseURLMap, "/").concat(argv.name, ".json?access_token=").concat(tokenMap);
  (0, _request["default"])({
    url: endpointMap,
    json: true
  }, function (error, response) {
    // Si la condición fuera solo argv.index no mostraría la temperatura del index 0, sino la lista.
    // de ahí a que tenga que comprobar con null.
    if (argv.index != null) {
      // Obtiene el objeto en función de su index.
      var place = response.body.features.find(function (element) {
        return response.body.features.indexOf(element) == argv.index;
      });

      if (place) {
        // Si index es valido
        console.log("Index: ".concat(argv.index, " / Lugar: ").concat(place.place_name));
        var baseURLWeather = 'https://api.darksky.net';
        var tokenWeather = '81e4c225f43bc1ff3f2bb48726dcf37b';
        var lat = place.geometry.coordinates[1];
        var _long = place.geometry.coordinates[0];
        var endpointWeather = "".concat(baseURLWeather, "/forecast/").concat(tokenWeather, "/").concat(lat, ",").concat(_long, "?units=si"); // Llamada a la siguiente request de forma que no se haga la llamada una antes de haber terminado
        // la otra.

        (0, _request["default"])({
          url: endpointWeather,
          json: true
        }, function (error, response) {
          console.log("Temperatura: ".concat(response.body.currently.temperature, "\xBAC"));
        });
      } else {
        // Si index es invalido
        console.log('Index incorrecto, prueba un index valido.');
      }
    } else {
      // Si no tiene index.
      console.log('Index of places:');
      response.body.features.forEach(function (element, i) {
        console.log("".concat(i, ": ").concat(element.place_name));
      });
    }
  });
}; // Para poder exportar la función desde otros ficheros js.


exports.localization = localization;