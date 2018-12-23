const argv = require('yargs').options({
    direccion: {
        demand: true,
        alias: 'd',
        desc: 'direccion de la ciudad que se quiere consultar el clima',
    }
}).argv

module.exports = {
    argv
}