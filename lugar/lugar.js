const axios = require('axios');

const getLugarLatLng = async(dir) => {
        //colocar la url friendly escapando carácteres especiales
        const encodedURL = encodeURI(dir);
        //Creando la instancia del axios para configurar el URL y su Header
        let instance = axios.create({
            baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encodedURL}`,
            headers: { 'X-RapidAPI-Key': '080d38232fmsh1b3c6981c8ed958p1d4050jsn9daea917ba0a' }
        });
        //Ejecutar la petición 
        const res = await instance.get();
        //Si la respuesta está vacia (no encontró resultado)
        if (res.data.Results.length === 0) {
            throw new Error(`No hay resultados para la ciudad ${dir}`);
        }
        //Si encontró resultados para esas ciudad tomará el primer elemento del arreglo
        const data = res.data.Results[0];
        const direccion = data.name;
        const lat = data.lat;
        const lng = data.lon;
        //regresa la direccion, latitud y longitud
        return {
            direccion,
            lat,
            lng
        }
    }
    //exportar la función para poder usarla en otro archivo
module.exports = {
    getLugarLatLng
}