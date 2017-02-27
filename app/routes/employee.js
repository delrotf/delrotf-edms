var express = require("express"),
    db = require('../../config/db.js'),
    dbutil = require('../../utils/dbutil'),
    httputil = require('../../utils/httputil'),
    multipart = require('connect-multiparty'),
    fs = require("fs");

module.exports = function(app) {
    var router = express.Router();
    
    //create and retrieve list
    router.route('/employee')
        .post(function(request, response) {
            console.log("Post Employees Invoked..");
            console.log("request.body: " + JSON.stringify(request.body));
            
            console.log("Username: " + request.body.username);
            console.log("Firstname: " + request.body.firstname);
            console.log("Lastame: " + request.body.lastname);
            console.log("Email: " + request.body.email);
            console.log("Password: " + request.body.password);

            // var id = request.body.id;
            var username = httputil.sanitizeInput(request.body.username);
            var firstname = httputil.sanitizeInput(request.body.firstname);
            var lastname = httputil.sanitizeInput(request.body.lastname);
            var email = httputil.sanitizeInput(request.body.email);
            var password = httputil.sanitizeInput(request.body.password);
        
            //dbutil.saveDocument(null, request.body, response);

        })
        .get(function(request, response) {
            console.log("Get Employees invoked.. ")
        
            var docList = [];
            var i = 0;
            db.list(function(err, body) {
                if (!err) {
                    var len = body.rows.length;
                    console.log('total # of docs -> ' + len);
                    if (len == 0) {
                        // push sample data
                        // save doc
                        var docName = 'sample_doc';
                        var docDesc = 'A sample Document';
                        db.insert({
                            name: docName,
                            value: 'A sample Document'
                        }, '', function(err, doc) {
                            if (err) {
                                console.log(err);
                            } else {
        
                                console.log('Document : ' + JSON.stringify(doc));
                                var responseData = httputil.createResponseData(
                                    doc.id,
                                    docName,
                                    docDesc, []);
                                docList.push(responseData);
                                response.write(JSON.stringify(docList));
                                console.log(JSON.stringify(docList));
                                console.log('ending response...');
                                response.end();
                            }
                        });
                    } else {
        
                        body.rows.forEach(function(document) {
                            db.get(document.id, {
                                revs_info: true
                            }, function(err, doc) {
                                if (!err) {

                                    var responseData = httputil.createResponseData(
                                        doc._id,
                                        doc.name,
                                        doc.value, []);
        
                                    docList.push(responseData);
                                    i++;
                                    if (i >= len) {
                                        response.write(JSON.stringify(docList));
                                        console.log('ending response...');
                                        response.end();
                                    }
                                } else {
                                    console.log(err);
                                }
                            });
        
                        });
                    }
        
                } else {
                    console.log(err);
                }
            });
        
        });
        
    //retrieve, update, and delete an employee
    router.route('/employee/:id')
        .get(function(request, response) {})
        .post(function(request, response) {})
        .put(function(request, response) {})
        .delete(function(request, response) {});

    app.use('/api', router);
};