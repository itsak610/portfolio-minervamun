var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new Schema({
	// ------ Login ------ //

	username: String,
	password: String,

	// ------------------- //

	// ------ Admin ------ //

	userType: String, // ( Admin / Surveillance / Accounting / User)

	// ------------------- //

	// ----- Details ----- //

	name: {
		type: String,
		default: "",
	},
	committee: {
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

	// ------------------- //

	// // --- Profile Pic --- //

	// profilepic: String,

	// // ------------------- //

	// ------ Other ------ //

	verification: String,
	verified: {
		type: Boolean,
		default: false,
	},
	time: {
		type: Date,
	},

	// ------------------- //
});

UserSchema.plugin(passportLocalMongoose, {
	usernameQueryFields: ["number", "username"],
});

module.exports = mongoose.model("User", UserSchema);
