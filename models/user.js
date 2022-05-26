var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new Schema({
	username: String,
	password: String,

	userType: String,

	name: {
		type: String,
		default: "",
	},
	committee: {
		type: String,
		default: "",
	},
	committeeCode: {
		type: String,
		default: "",
	},
	allotment: {
		type: String,
		default: "",
	},
	email: {
		type: String,
		default: "",
	},
	number: {
		type: String,
		default: "",
	},
	password1: {
		type: String,
		default: "",
	},

	paymentID: String,

	time: {
		type: Date,
	},
});

UserSchema.plugin(passportLocalMongoose, {
	usernameQueryFields: ["number", "username"],
});

module.exports = mongoose.model("User", UserSchema);
