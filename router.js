function route (pathname, handle, res, req) { //this gets passed the pathname and handler object, as well as the user's input, and takes the response object to pass along to the handler function
  console.log('routing a request for ' + pathname);
  if (typeof handle[pathname] === 'function') { //decide if the pathname was real (/start or /upload)
    handle[pathname](res, req); //execute the handler function associated with the pathname, and pass it the response object and the user's input
      } else { //if the pathname wasn't real, 404 it
        console.log('handler for ' + pathname + ' not found'); //if it wasn't, then write an error response
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('404 not hound (❍ᴥ❍ʋ) ' + pathname);
        res.end();
      };
  
};

//export this function to index.js --> go to index.js
exports.route = route;