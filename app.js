const { argv } = require('./yargs.config');
const axios = require('axios');
const clima = require('./clima/clima')

let encodeUrl = encodeURI(argv.direccion);

let resultdireccion = async() => {

    let resp = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeUrl}&key=AIzaSyDzbQ_553v-n8QNs2aafN9QaZbByTyM7gQ`);

    if (resp.data.status === 'ZERO_RESULTS') {
        throw new Error(`No se encontraron resultados para la direccion ${argv.direccion}`);
    }

    let { formatted_address, geometry } = resp.data.results[0];
    let { lat, lng } = geometry.location;

    return {
        formatted_address,
        lat,
        lng
    };
}


// resultdireccion()
//     .then(result => {})
//     .catch(err => console.log(err));


// clima.temperatura(11111111, 111111).then((result) => {
//     console.log(result);
// }).catch((err) => {
//     console.log(err);

// });

let getInformacion = async() => {
    try {
        console.log("Consultando Direccion....");
        let resp = await resultdireccion();
        console.log("Consultando Clima....");
        let info = await clima.temperatura(resp.lat, resp.lng)

        return `La temperatura es: ${info} °C en ${resp.formatted_address}`

    } catch (error) {
        return "No se logro obtener la informacion"
    }
}

getInformacion().then((result) => {
    console.log(result);
}).catch(err => {
    console.log("Error", err);
})