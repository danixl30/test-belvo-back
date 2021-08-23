const express = require('express');
const app = express()
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const belvoRoutes = require('./router/belvo.routes')

app.set('port', process.env.PORT || 4000);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(belvoRoutes);

app.listen(app.get('port'), () => {
    console.log('Server started on ', app.get('port'));
})