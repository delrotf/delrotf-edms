var express = require("express");

module.exports = function(app) {
    var router = express.Router();
    
    //create and retrieve list
    router.route('/api/auditlog')
        .post(function(request, response) {})
        .get(function(request, response) {});
        
    //retrieve, update, and delete an employee
    router.route('/api/auditlog/:id')
        .get(function(request, response) {})
        .post(function(request, response) {})
        .delete(function(request, response) {});
};