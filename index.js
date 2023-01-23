const dotenv = require("dotenv");

dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use('/images', express.static('images'))

// create application/json parser
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(jsonParser, urlencodedParser);
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use('/', require('./routes'));

app.get('/ping', (req, res) => {
    res.send('pong');
  });

  const server = app.listen(8080, () => {
    const { port } = server.address();
    console.log(`This app is running on port:${port}`);
  });

  module.exports = app;