var httputil = require("./httputil");
var bcrypt = require('bcrypt');

module.exports = {
    authenticate: function(db, jsonDoc, response) {
        jsonDoc = JSON.parse(httputil.sanitizeInput(JSON.stringify(jsonDoc)));
        
        db.get(jsonDoc._id, {revs_info: false}, function(err, body) {
            console.log("jsonDoc " + JSON.stringify(jsonDoc));
            
            if (!err) {
                bcrypt.compare(jsonDoc.password, body.password, function(err, res) {
                    if(res) {
                        response.sendStatus(200);
                    } else {
                        response.sendStatus(401); // Unauthorized
                    }
                });
            } else {
                console.log(err);
                response.sendStatus(err.statusCode);
            }
        });
    },
    save: function(db, id, jsonDoc, response) {
        jsonDoc = JSON.parse(httputil.sanitizeInput(JSON.stringify(jsonDoc)));
        
        bcrypt.genSalt(10, function(err, salt) {
            if(err) {
                console.log(err);
                return
            }
            
            bcrypt.hash(jsonDoc.password, salt, function(err, hash) {
                if(err) {
                    console.log(err);
                    return
                }
                
                jsonDoc.password = hash;
    
                //create
                if (id === undefined || id === null) {
                    // Generated random id
                    id = '';
            
                    db.insert(jsonDoc, id, function(err, doc) {
                        if (err) {
                            console.log('Error saving data\n' + err);
                            response.sendStatus(err.statusCode);
                        } else
                            response.sendStatus(200);
                        response.end();
                    });
                }
                //update
                else {
                    //get the latest _rev first
                    db.get(id, {revs_info: false}, function(err, body) {
                        if (!err) {
                            jsonDoc._rev = body._rev;
                            //update
                            db.insert(jsonDoc, id, function(err, doc) {
                                if (err) {
                                    console.log('Error saving data\n' + err);
                                    response.sendStatus(err.statusCode);
                                } else
                                    response.sendStatus(200);
                                response.end();
                            });
                        } else {
                            console.log(err);
                            response.sendStatus(500);
                        }
                    });
                }
            });
        });
    },
    destroy: function(db, id, response) {
        //get the latest _rev first
        db.get(id, {revs_info: false}, function(err, body) {
            if (!err) {
                //destroy
                db.destroy(id, body._rev, function(err, doc) {
                    if (err) {
                        console.log('Error destroying data\n' + err);
                        response.sendStatus(err.statusCode);
                    } else {
                        response.sendStatus(200);
                    }
                    response.end();
                });
            } else {
                console.log(err);
                response.sendStatus(err.statusCode);
            }
        });
    
    },
    get: function(db, id, response) {
        db.get(id, {revs_info: false}, function(err, body) {
            if (!err) {
                response.json(body);
            } else {
                console.log(err);
                response.sendStatus(err.statusCode);
            }
        });
    },
    list: function(db, response) {
        db.list({revs_info: false}, function(err, body) {
            if (!err) {
                response.json(body);
                console.log('total # of docs -> ' + body.total_rows);
            } else {
                console.log(err);
                response.sendStatus(err.statusCode);
            }
        });
    }
};
