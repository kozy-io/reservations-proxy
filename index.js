const express = require('express');
const httpProxy = require('http-proxy');
require('newrelic');
const apiProxy = httpProxy.createProxyServer();
const serverReservations = 'http://13.52.104.167:3006';
const app = express();
const port = 3005;
const bodyParser = require('body-parser');
const morgan = require('morgan');
app.use(bodyParser());
app.use(morgan());
app.use('/:listingID', express.static('./public/dist'));

app.all('/api/reservations/:listingID', (req, res) => {
  apiProxy.web(req, res, {
    target: serverReservations
  });
})

// Connect to reservations locally
// app.all('/api/reservations/:listingID', (req, res) => {
//   apiProxy.web(req, res, {
//     target: 'http://127.0.0.1:3006'
//   });
// })


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
