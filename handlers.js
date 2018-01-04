var querystring = require('querystring'),
    fs = require('fs'),
    formidable = require('formidable');

function start(res) {
  console.log('request handler start was called'); //this will be executed when the pathname was /start
  var body = '<html>'+ //html for the start page, just a file button and a display button
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data", method="post">'+ //set the action to point to /upload
    '<input type="file" name="upload" >'+
    '<input type="submit" value="Display that bitch" />'+
    '</form>'+
    '</body>'+
    '</html>';
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(body); //write the html "file" to the browser
    res.end();
 
};

function upload(res, req) { //this gets passed the response object to write to, and the user's input into the form field (userPost)
  console.log("Request handler 'upload' was called.");
  var form = new formidable.IncomingForm();
  console.log('parsing soon');
  form.parse(req, function(err, fields, files) { //parse the uploaded file using formidable
    console.log('parse complete');
    fs.rename(files.upload.path, '/tmp/test.png', function(err) { //this callback is for the windows bug with renaming files
      if (err) {
        fs.unlink('/tmp/test.png');
        fs.rename(files.upload.path, '/tmp/test.png');
      };
    });
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('received image <br />');
    res.write('<img src = "/display" />'); //img source is at the /display pathname
    res.end();
  });
              
}

function display(res) {
  console.log('called display');
  res.writeHead(200, {'Content-Type': 'image/png'});
  fs.createReadStream('/tmp/test.png').pipe(res); //create readstream for file and pipe it into the response object
};

//export both of them --> go to index.js
exports.start = start;
exports.upload = upload;
exports.display = display;
