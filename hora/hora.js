const axios = require('axios');

const getHoraLatLng = async(lat, lng) => {
        //colocar la url friendly escapando carácteres especiales
        //const encodedURL = encodeURI(dir);
        let API_KEY = 'SFZ914Q53ZFI';
        let URL = `http://api.timezonedb.com/v2.1/get-time-zone?key=${API_KEY}&format=json&by=position&lat=${lat}&lng=${lng}`;

        let resp = await axios.get(URL);

        return resp.data;
    }
    //exportar la función para poder usarla en otro archivo
module.exports = {
    getHoraLatLng
}