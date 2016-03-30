/*
 * main router method: Each and every requests are routed
 *  through this method.
 *
 */

module.exports = function(app, passport){

    app.get('/', function(req, res){
        res.render('index');
    });

    app.get('/home', function(req, res){
        res.render('main');
    });

    //Render layout jade files
    app.get('/layout/:filename', function(req, res){
      console.log('Trying to fetch layout files : ');
      var filename = req.params.filename;
      console.log(filename);
      res.render('layout/'+ filename);
    });

    var userRoutes = require('./user')(passport);
    //other routes..
    app.use('/user', userRoutes);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    // error handlers
    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
      app.use(function(err, req, res, next) {
        console.log('Rendering error');
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err
        });
      });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {}
      });
    });
}
