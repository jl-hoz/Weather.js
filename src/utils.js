import request from 'request';

const localization = function(argv){
    const baseURLMap = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
    const tokenMap = 'pk.eyJ1Ijoiamxob3oiLCJhIjoiY2sxYW8yN3IyMDE0ODNjb2JqaG5jYzRjOSJ9.Adhcrl_QfmujWayhu7ABjA';
    const endpointMap = `${baseURLMap}/${argv.name}.json?access_token=${tokenMap}`;
    request({url: endpointMap, json: true}, (error, response) => {
        // Si la condición fuera solo argv.index no mostraría la temperatura del index 0, sino la lista.
        // de ahí a que tenga que comprobar con null.
        if(argv.index != null){ 
            // Obtiene el objeto en función de su index.
            const place = response.body.features.find(element => response.body.features.indexOf(element) == argv.index);
            if(place){ // Si index es valido
                console.log(`Index: ${argv.index} / Lugar: ${place.place_name}`);
                const baseURLWeather = 'https://api.darksky.net';
                const tokenWeather = '81e4c225f43bc1ff3f2bb48726dcf37b';
                const lat = place.geometry.coordinates[1];
                const long = place.geometry.coordinates[0];
                const endpointWeather = `${baseURLWeather}/forecast/${tokenWeather}/${lat},${long}?units=si`;
                // Llamada a la siguiente request de forma que no se haga la llamada una antes de haber terminado
                // la otra.
                request({url: endpointWeather, json: true}, (error, response) => {
                    console.log(`Temperatura: ${response.body.currently.temperature}ºC`);
                });
            }else{ // Index es invalido
                console.log('Index incorrecto, prueba un index valido.')
            }
            
        }else{ // Si no tiene index.
            console.log('Index of places:');
            response.body.features.forEach((element, i) => {
                console.log(`${i}: ${element.place_name}`);
            });
        }
      });
}

export {localization}; // Para poder exportar la función desde otros ficheros js.