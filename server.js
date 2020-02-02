const express = require('express')
const cors = require('cors')
const expressip = require('express-ip');
const request = require('request');
const tr = require('tor-request');


const app = express()

// middleware for cors 
app.use(cors())

// middleware for express-ip package
app.use(expressip().getIpInfoMiddleware);

const targetURL = "https://m.betvictor.com/bv_in_play/v2/en-gb/1/mini_inplay.json"

app.get('/api/sports', (req, resp) => {

  // list with some countries that allow online gambling
  const countries = ["UK", "DE", "FR", "IT", "US", "IN", "UA", "PL", "RU", "AU", "CA", "IL", "SG", "AG"]

  const ipInfo = req.ipInfo
  if (ipInfo.country && countries.includes(ipInfo.country)) {
    request(targetURL, 
      function (err, res, body) {
        if (err) {
          console.log("error", err)
          resp.send("Something went wrong, please reload the page.")
        } else if (!err && res.statusCode == 200) {
         resp.json(body)
        } else {
          console.log(res.statusCode)
          resp.send("Something went wrong, please reload the page.")
        }
    })
  } else {
    tr.request({uri: targetURL}, 
    function (err, res, body) {
      if (err) {
        console.log("error", err)
        resp.send("Something went wrong, please reload the page.")
      } else if (!err && res.statusCode == 200) {
       resp.json(body)
      } else {
        console.log(res.statusCode)
        resp.send("Something went wrong, please reload the page.")
      }
    });
  }
});


const port = process.env.port || 5000

app.listen(port)