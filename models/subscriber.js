var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SubscriberSchema = new Schema({
	SubscriberEmail: String,
});

SubscriberSchema.statics.addSubscriber = function (SubscriberEmail, callback) {
	var qs = new Subscriber({
		SubscriberEmail: SubscriberEmail,
	});
	qs.save(function (err) {
		if (err) {
			return callback(err);
		} else {
			return callback(null, qs);
		}
	});
};

var Subscriber = mongoose.model("Subscriber", SubscriberSchema);
module.exports = Subscriber;
