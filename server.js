// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//timestamp endpoint...
app.get("/api/timestamp/:date_string", function(req, res){
  console.log(req.params.date_string);
  var in_str = req.params.date_string;
  var d;
  var result_unix_format, result_utc_format;
  
  if(in_str == ""){
    var curr = new Date();
    result_unix_format = curr.getTime();
    result_utc_format = curr.toUTCString();    
  }    
  else{
    d = Date.parse(in_str);
    if(isNaN(d)){
      //try as unix timestamp
      var in_ts = Number(in_str);
      if(isNaN(in_ts))
        res.json({"error":"Invalid Date"});
      else{
        if(in_str.length == 10)
          d = new Date(in_ts*1000);
        else
          d = new Date(in_ts);
        result_unix_format = d.getTime();
        result_utc_format = new Date(d).toUTCString();   
      }
    }else{
      result_unix_format = d;
      result_utc_format = new Date(d).toUTCString(); 
    }
  }
     
  res.json({"unix":result_unix_format, "utc":result_utc_format});
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});