var express = require("express"),
    db = require('../../db/db.js')('employees'),
    dbutil = require('../../utils/dbutil');

module.exports = function(app) {
    var router = express.Router();
    
    //create and retrieve list
    router.route('/login')
        .post(function(request, response) {
            console.log("Post Invoked..");
            dbutil.authenticate(db, request.body, response);
        });
        
    //create and retrieve list
    router.route('/employees')
        .post(function(request, response) {
            console.log("Post Invoked..");
            dbutil.save(db, null, request.body, response);
        })
        .get(function(request, response) {
            console.log("Get invoked.. ");
            dbutil.list(db, response);
        });
        
    //retrieve, update, and delete a document
    router.route('/employees/:_id')
        .get(function(request, response) {
            console.log("Get invoked.. " + JSON.stringify(request.params));
            dbutil.get(db, request.params._id, response);
        })
        .post(function(request, response) {
            console.log("Post Invoked.." + JSON.stringify(request.params));
            dbutil.save(db, request.params._id, request.body, response);
        })
        .put(function(request, response) {
            console.log("Put Invoked.." + JSON.stringify(request.params));
            dbutil.save(db, request.params._id, request.body, response);
        })
        .delete(function(request, response) {
            console.log("Delete Invoked.." + JSON.stringify(request.params));
            dbutil.destroy(db, request.params._id, response);
        });

    app.use('/api', router);
};