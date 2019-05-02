const express = require('express');
const app = express();
//===================
const lugar = require('../lugar/lugar');
const clima = require('../clima/clima');
const hora = require('../hora/hora');


const getInfoHelper = async(direccion) => {

    try {

        const coords = await lugar.getLugarLatLng(direccion);
        const hour = await hora.getHoraLatLng(coords.lat, coords.lng);
        const temp = await clima.getClimaLatLng(coords.lat, coords.lng);

        let weather = {
            direccion: coords.direccion,
            hora: hour.formatted,
            hora_abbr: hour.abbreviation,
            pronostico: temp.weather[0]['description'],
            temp: temp.main.temp,
            temp_min: temp.main.temp_min,
            temp_max: temp.main.temp_max,
            presion: temp.main.pressure,
            humedad: temp.main.humidity,
            viento: temp.wind.speed,
            dviento: temp.wind.deg,
            nubosidad: temp.clouds.all
        };

        return weather;

    } catch (error) {
        return {
            ok: false,
            message: `No se pudo determinar el clima de: ${direccion} verifique la dirección indicada. ${error}`
        }
    }

}

app.post('/buscar/:dir', async function(req, res) {

    let direccion = req.params.dir;
    let encodedURL = encodeURI(direccion);

    const resp = await getInfoHelper(encodedURL);

    // res.send({
    //     resp
    // });

    if (resp.ok === false) {
        res.render('home', {
            message: resp.message
        });
    }

    res.render('home', {
        direccion: resp.direccion,
        hora: resp.hora,
        hora_abbr: resp.hora_abbr,
        pronostico: resp.pronostico,
        temp: resp.temp,
        temp_min: resp.temp_min,
        temp_max: resp.temp_max,
        presion: resp.presion,
        humedad: resp.humedad,
        viento: resp.viento,
        dviento: resp.dviento,
        nubosidad: resp.nubosidad
    });

});


module.exports = app;