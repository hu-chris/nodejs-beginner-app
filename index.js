
//import all of my modules
var server = require('./server'); //imports the ".lul" function which starts the server
var router = require('./router'); //imports the route function which executes the handler associated with the specific request
var handlers = require('./handlers'); //imports the handlers (start and upload) which defines how requests will be handled (when executed by router)

//create the handle object
var handle = {};
handle['/'] = handlers.start;
handle['/start'] = handlers.start;
handle['/upload'] = handlers.upload;
handle['/display'] = handlers.display;

//execute everything; execute the start function from server import, using the route function from router, and the handler functions from handler
// this will start the server, which parses the pathname and then calls router() on it, which then executes the associated handler that matches that pathname
server.lul(router.route, handle);