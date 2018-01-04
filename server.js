
//import the node modules
var http = require('http');
var url = require('url');

//define the start function
function start (route, handle) {
  http.createServer(function(req, res){ //create the server
    var pathname = url.parse(req.url).pathname; //parse the path name (string after the / in the URL) and store it here
    console.log(pathname + ' request received');  //log the path name
    route(pathname, handle, res, req);
  }).listen(process.env.PORT); //listen on the default port
};

exports.lul = start; //export this to index.js