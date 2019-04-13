const argv = require('./config/yargs').argv;
const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');


const getInfo = async(direccion) => {

    try {
        console.log(`Obteniendo información del clima en ${direccion}...`);
        const coords = await lugar.getLugarLatLng(direccion);
        const temp = await clima.getClimaLatLng(coords.lat, coords.lng);
        return `El clima en: ${coords.direccion} es de: ${temp} `;
    } catch (error) {
        return `No se pudo determinar el clima de: ${direccion}`;
    }

}

getInfo(argv.direccion)
    .then(console.log())
    .catch(console.log());