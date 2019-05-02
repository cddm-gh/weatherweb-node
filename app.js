const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const app = express();

//Body parser
app.use(bodyParser.urlencoded({ extended: true }));

//Habilitar la carpeta public
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use(require('./routes/buscar'));

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.render('home', {
        name: 'Carlos Delgado',
    });
})

app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${port} `);
});