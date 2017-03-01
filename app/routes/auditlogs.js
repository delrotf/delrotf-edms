var express = require("express"),
    db = require('../../db/db.js')('auditLogs'),
    dbutil = require('../../utils/dbutil');

module.exports = function(app) {
    var router = express.Router();
    
    //create and retrieve list
    router.route('/auditlogs')
        .post(function(request, response) {
            console.log("Post Invoked..");
            dbutil.save(db, null, request.body, response);
        })
        .get(function(request, response) {
            console.log("Get invoked.. ");
            dbutil.list(db, response);
        });
        
    //retrieve, update, and delete a document
    router.route('/auditlogs/:_id')
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