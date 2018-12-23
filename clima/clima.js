const axios = require('axios');


let temperatura = async(lat, long) => {
    let resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=f369635965b00ad16ced5da4da4b9f3b`)

    return resp.data.main.temp
}

module.exports = {
    temperatura
}