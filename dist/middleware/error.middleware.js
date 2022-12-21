"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorMiddleware(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
}
exports.default = errorMiddleware;
