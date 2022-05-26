var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    MessageName: String,
    MessageEmail: String,
    MessageContent: String,
});

MessageSchema.statics.addMessage = function(
    MessageName,
    MessageEmail,
    MessageContent,
    callback
) {
    var qs = new Message({
        MessageName: MessageName,
        MessageEmail: MessageEmail,
        MessageContent: MessageContent,
    });
    qs.save(function(err) {
        if (err) {
            return callback(err);
        } else {
            return callback(null, qs);
        }
    });
};

var Message = mongoose.model("Message", MessageSchema);
module.exports = Message;