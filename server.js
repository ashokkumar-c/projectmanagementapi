const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');
const config = require('./app/config/config');
const app = express();

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());
app.use(require('./app/routers'));

const db = mongoose.connect(`mongodb://${global.gConfig.db.host}:${global.gConfig.db.port}/${global.gConfig.db.database}`,{ useNewUrlParser: true, useFindAndModify: false });


mongoose.connection.on('connected', () => {
    console.log(`Mongoose default connection open to ${global.gConfig.db.database}`);
  });

//Express application will listen to port mentioned in our configuration
app.listen(global.gConfig.app.port, (err) =>{
    if(err) throw err;
    console.log(`App listening on port ${global.gConfig.app.port}`);
  });

  module.exports = app;