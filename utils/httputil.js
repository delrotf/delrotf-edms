module.exports = {
    sanitizeInput: function(str) {
        return String(str).replace(/&(?!amp;|lt;|gt;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    },
    
    createResponseData: function(id, name, value, attachments) {
    
        var responseData = {
            id: id,
            name: this.sanitizeInput(name),
            value: this.sanitizeInput(value),
            attachements: []
        };
    
    
        attachments.forEach(function(item, index) {
            var attachmentData = {
                content_type: item.type,
                key: item.key,
                url: '/api/favorites/attach?id=' + id + '&key=' + item.key
            };
            responseData.attachements.push(attachmentData);
    
        });
        
        return responseData;
    }
}