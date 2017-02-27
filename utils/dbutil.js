var db = require("../config/db");

exports = {
    saveDocument: function(id, document, response) {
    
        if (id === undefined) {
            // Generated random id
            id = '';
        }
    
        db.insert(document, id, function(err, doc) {
            if (err) {
                console.log(err);
                response.sendStatus(500);
            } else
                response.sendStatus(200);
            response.end();
        });
    
    }
};
