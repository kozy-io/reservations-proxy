const express = require('express');
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();
const serverPhotos = 'http://localhost:3002';
const serverCalendar = 'http://18.216.217.96';
const serverListing = 'http://localhost:3000';
const serverReviews = 'http://localhost:3004';
const path = require('path');
const app = express();
const port = 3005;
const bodyParser = require('body-parser');
const morgan = require('morgan');
app.use(bodyParser());
app.use(morgan());
app.use('/:listingID', express.static('./public/dist'));

app.all('/listing/desc/:listingID', (req, res) => {
  console.log('redirecting to listing server');
  
  apiProxy.web(req, res, {
    target: serverListing
  });
})

app.all('/listing/amenity/:listingID', (req, res) => {
  console.log('redirecting to listing server');
  
  apiProxy.web(req, res, {
    target: serverListing
  });
})

app.all('/listing/:listingID', (req, res) => {
  console.log('redirecting to calendar server');
  
  apiProxy.web(req, res, {
    target: serverCalendar
  });
})

app.all('/custom/month', (req, res) => {
  console.log('redirecting to calendar server');
  
  apiProxy.web(req, res, {
    target: serverCalendar
  });
})

app.all('/reserved/month', (req, res) => {
  console.log('redirecting to calendar server');
  
  apiProxy.web(req, res, {
    target: serverCalendar
  });
})

app.all('/api/listings/photos/:listingID', (req, res) => {
  console.log('redirecting to photos server');
  
  apiProxy.web(req, res, {
    target: serverPhotos
  });
})

// reviews

app.all('/api/reviews/:listingID', (req, res) => {
  console.log('redirecting to reviews server');
  
  apiProxy.web(req, res, {
    target: serverReviews
  });
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
