//libreria para hacer peticiones http
const axios = require('axios');

const getClimaLatLng = async(lat, lng) => {
        //colocar la url friendly escapando carácteres especiales
        //const encodedURL = encodeURI(dir);
        let api_key = 'f9895a59c850b0c7e088c730b79a0f33';
        let lang = 'es';
        let units = 'metric';
        let URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}&units=${units}&lang=${lang}`;
        let resp = await axios.get(URL);

        // return resp.data.main.temp;
        return resp.data;
    }
    //exportar la función para poder usarla en otro archivo
module.exports = {
    getClimaLatLng
}