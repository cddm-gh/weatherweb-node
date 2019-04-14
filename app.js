const argv = require('./config/yargs').argv;
const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');
const colors = require('colors');


const getInfo = async(direccion) => {

    try {
        console.log(`Obteniendo información del clima en ${direccion}...`.green);
        const coords = await lugar.getLugarLatLng(direccion);
        const temp = await clima.getClimaLatLng(coords.lat, coords.lng);
        return `El clima en: ${coords.direccion} es de: ${temp}° `;
    } catch (error) {
        return `No se pudo determinar el clima de: ${direccion}`;
    }

}

//Como la función getInfo es async la llamo de la siguiente manera
(async function() {
    try {
        const resp = await getInfo(argv.direccion);
        console.log(resp);
    } catch (error) {
        console.log(`Error ${error}`);
    }
})()