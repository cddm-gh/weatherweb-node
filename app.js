const argv = require('./config/yargs').argv;
const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');
const colors = require('colors');


const getInfo = async(direccion) => {

    try {
        console.log(`Obteniendo información del clima en ${direccion}...`.green);
        const coords = await lugar.getLugarLatLng(direccion);
        const temp = await clima.getClimaLatLng(coords.lat, coords.lng);

        let weather = {
            direccion: coords.direccion,
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
            message: `No se pudo determinar el clima de: ${direccion} verifique la dirección indicada.`
        }
    }

}

//Como la función getInfo es async la llamo de la siguiente manera
(async function() {
    try {
        const resp = await getInfo(argv.direccion);

        if (resp.ok === false) {
            console.log(resp.message);
        } else {

            console.log(`=====> Lugar: ${resp.direccion} <=====`.yellow);
            console.log(`El pronotico es de: ${resp.pronostico} `.underline.white);
            console.log('La temperatura actual es de: ' + colors.blue(`${resp.temp} `) + 'C°');
            console.log('La temperatura mínima: ' + colors.blue(`${resp.temp_min} `) + 'C°');
            console.log('La temperatura máxima: ' + colors.blue(`${resp.temp_max} `) + 'C°');
            console.log(`La presión atmósferica es: ${resp.presion} hPa`);
            console.log('La Humedad es: ' + colors.red(`${resp.humedad}`) + ' %');
            console.log(`La velocidad del viento: ${resp.viento} mts/seg`);
            console.log(`Dirección del viento: ${resp.dviento}°`);
            console.log(`Nubosidad: ${resp.nubosidad}%`);
        }
    } catch (error) {
        console.log(`Error ${error}`);
    }
})();