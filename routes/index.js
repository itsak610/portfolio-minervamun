// -------------------------------------------------------- Functions and Variables -------------------------------------------------------- //
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/user");
// var LocalStrategy = require("passport-local").Strategy;
// const { find } = require("../models/user");

// ---------------- Randomize ----------------  //

function makeid(length) {
	var result = "";
	var characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

// -------------------------------------------- //

// ----------------------------------------------------------------------------------------------------------------------------------------- //

// ----------------------------------------------------------- Automatic Mailer -----------------------------------------------------------  //

// const nodemailer = require('nodemailer');
// const { google } = require('googleapis');

// const CLIENT_ID = '638781291529-c7tgea5km6kgb2ganamane5bhj6bsnh1.apps.googleusercontent.com';
// const CLEINT_SECRET = 'dZib3-TgRMsNiC-RvCHXkMfF';
// const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
// const REFRESH_TOKEN = '1//04Cd1A1ATeztKCgYIARAAGAQSNwF-L9IrlNSYxtlcy5WY9fMtfD_Bd2vZND1OfjEWPt4Ujycq5hCsjm09cEYb9WZTWQPjcmY4XxM';

// const oAuth2Client = new google.auth.OAuth2(
//     CLIENT_ID,
//     CLEINT_SECRET,
//     REDIRECT_URI
// );
// oAuth2Client.setCredentials({
//     refresh_token: REFRESH_TOKEN
// });

// ------------------------------------------------------------- Normal Routes ------------------------------------------------------------- //

router.get("/", (req, res, next) => {
	return res.redirect("/home");
});

router.get("/home", (req, res, next) => {
	return res.render("home");
});

router.get("/home2", (req, res, next) => {
	return res.render("home2");
});

router.get("/careers", (req, res, next) => {
	return res.render("careers");
});

router.get("/contact", (req, res, next) => {
	return res.render("partnecontactrs");
});

router.get("/firm", (req, res, next) => {
	return res.render("firm");
});

router.get("/services", (req, res, next) => {
	return res.render("services");
});

// ----------------------------------------------------------------------------------------------------------------------------------------- //

// // --------------------------------------------------------- User Logged In Routes --------------------------------------------------------- //

// router.get("/dashboard", (req, res, next) => {
// 	return res.redirect("/user/dashboard");
// });

// router.get("/user/dashboard", (req, res, next) => {
// 	if (req.user) {
// 		if (req.user.userType == "user") {
// 			return res.render("dashboard", {
// 				title: "Dashboard",
// 			});
// 		} else {
// 			return res.redirect("/admin/dashboard");
// 		}
// 	} else {
// 		return res.redirect("/login");
// 	}
// });

// router.get("/verify/:id", (req, res, next) => {
// 	User.findOne(
// 		{
// 			verification: req.params.id,
// 		},
// 		function (err, user) {
// 			if (!user) {
// 				return res.render("error");
// 			} else {
// 				user.verified = true;
// 				user.save();
// 				return res.render("verified");
// 			}
// 		}
// 	);
// });

// router.get("/logout", (req, res, next) => {
// 	req.session.destroy();
// 	req.logout();
// 	res.redirect("/login");
// });

// // ----------------------------------------------------------------------------------------------------------------------------------------- //

// -------------------------------------------------------------- User Routes -------------------------------------------------------------- //

// ---------------------------- User Login Routes ----------------------------  //

// router.get("/login", (req, res, next) => {
// 	if (req.user) {
// 		return res.redirect("/user/dashboard");
// 	} else if (!req.user) {
// 		return res.render("login", {
// 			title: "Login",
// 		});
// 	}
// });

// router.post("/login", (req, res, next) => {
// 	passport.authenticate("local", function (err, user) {
// 		if (err) {
// 			return res.render("login", {
// 				title: "Login",
// 				error: err.message,
// 			});
// 		}
// 		if (!user) {
// 			return res.render("login", {
// 				title: "Login",
// 				error: "Wrong username/password.",
// 			});
// 		}
// 		req.logIn(user, function (err) {
// 			return res.redirect("/dashboard");
// 		});
// 	})(req, res, next);
// });

// // ----------------------------------------------------------------------------- //

// // --------------------------- User Register Routes ---------------------------  //

// router.get("/register", (req, res, next) => {
// 	if (req.user) {
// 		return res.redirect("/user/dashboard");
// 	} else {
// 		return res.render("register", {
// 			title: "Register",
// 		});
// 	}
// });

// router.post("/register", (req, res) => {
// 	if (req.body.password != req.body.passwordConfirm) {
// 		return res.render("register", {
// 			title: "Register",
// 			error: "The passwords dont match.",
// 			errorcode: "red",
// 		});
// 	} else {
// 		User.findOne(
// 			{
// 				username: req.body.email,
// 			},
// 			function (err, user) {
// 				if (!user) {
// 					var verifyid = makeid(64);
// 					User.register(
// 						new User({
// 							userType: "user",
// 							username: req.body.email,
// 							email: req.body.email,
// 							name: req.body.name,
// 							number: req.body.number,
// 							committee: req.body.committee,
// 							city: req.body.city,
// 							verification: verifyid,
// 							time: new Date(),
// 						}),
// 						req.body.password,
// 						function (err, user) {
// 							if (err) {
// 								return res.render("register", {
// 									title: "Register",
// 									error: "The email is already registered.",
// 									errorcode: "red",
// 								});
// 							} else {
// 								return res.render("register", {
// 									isRedirect: true,
// 									title: "Student Register",
// 									error: "User registered successfully.",
// 									errorcode: "blue",
// 								});
// 							}
// 						}
// 					);
// 				} else {
// 					return res.render("register", {
// 						title: "Register",
// 						error: "The email is already registered.",
// 						errorcode: "red",
// 					});
// 				}
// 			}
// 		);
// 	}
// });

// // ----------------------------------------------------------------------------- //

// // ----------------------------------------------------------------------------------------------------------------------------------------- //

// // ------------------------------------------------------------- Admin Routes -------------------------------------------------------------  //

// // ------------------------------------ Admin Panel Routes ------------------------------------  //

// // ----------------------------- Admin Dashboard -----------------------------  //

// router.get("/admin", (req, res) => {
// 	if (req.user) {
// 		if (req.user.userType == "admin1") {
// 			res.redirect("/admin/dashboard");
// 		} else if (req.user.userType == "admin2") {
// 			res.redirect("/admin/entries");
// 		} else if (req.user.userType == "admin3") {
// 			res.redirect("/admin/allotment");
// 		} else {
// 			res.redirect("/dashboard");
// 		}
// 	} else {
// 		res.redirect("/login");
// 	}
// });

// router.get("/admin/dashboard", (req, res) => {
// 	if (req.user) {
// 		if (req.user.userType != "admin1") {
// 			res.redirect("/dashboard");
// 		} else {
// 			return res.render("admin-1-dashboard", {
// 				title: "Admin Panel",
// 			});
// 		}
// 	} else {
// 		res.redirect("/login");
// 	}
// });

// // ---------------------------------------------------------------------------- //

// // ---------------------------- Admin Manage Teams ---------------------------- //

// router.get("/admin/entries", (req, res, next) => {
// 	if (req.user) {
// 		if (req.user.userType != "admin2" || req.user.userType != "admin1") {
// 			res.redirect("/dashboard");
// 		} else {
// 			var query1 = {
// 				userType: "user",
// 			};
// 			User.find()
// 				.find(query1)
// 				.exec(function (err, teams1) {
// 					return res.render("admin-entries", {
// 						teams: teams1,
// 						title: "View Entries",
// 					});
// 				});
// 		}
// 	} else {
// 		res.redirect("/login");
// 	}
// });

// // ---------------------------------------------------------------------------- //

// // ------------------------------- Admin Events ------------------------------- //

// router.get("/admin/committees", (req, res, next) => {
// 	if (req.user) {
// 		if (req.user.userType != "admin3" || req.user.userType != "admin1") {
// 			res.redirect("/dashboard");
// 		} else {
// 			return res.render("admin-view-committees", {
// 				title: "View Committees",
// 			});
// 		}
// 	} else {
// 		res.redirect("/login");
// 	}
// });

// // ---------------------------------------------------------------------------- //

// // ---------------------------- Admin Event Teams ----------------------------  //

// router.get("/admin/committees/:committee/allotment", (req, res, next) => {
// 	if (req.user) {
// 		if (req.user.userType != "admin2" || req.user.userType != "admin3") {
// 			res.redirect("/dashboard");
// 		} else {
// 			var query1 = {
// 				userType: "user",
// 			};
// 			var query1 = {
// 				committee: req.params.event,
// 			};
// 			User.find()
// 				.find(query1)
// 				.find(query2)
// 				.sort("allotment")
// 				.exec(function (err, teams1) {
// 					return res.render("admin-committee-allotment", {
// 						teams: teams1,
// 						title: req.params.event + " Allotment",
// 					});
// 				});
// 		}
// 	} else {
// 		res.redirect("/login");
// 	}
// });

// // ---------------------------------------------------------------------------- //

// // -------------------------- Admin Student Details --------------------------  //

// router.get("/admin/participant/:id", (req, res, next) => {
// 	if (req.user) {
// 		if (req.user.userType != "admin1") {
// 			res.redirect("/dashboard");
// 		} else {
// 			var query2 = {
// 				userType: "user",
// 			};
// 			var query3 = {
// 				username: req.params.id,
// 			};
// 			User.find()
// 				.find(query2)
// 				.find(query3)
// 				.exec(function (err, teams3) {
// 					if (teams3.length == 0) {
// 						return res.render("error");
// 					} else {
// 						return res.render("admin-participant-details", {
// 							teams: teams3,
// 							title: "Participant Details",
// 						});
// 					}
// 				});
// 		}
// 	} else {
// 		res.redirect("/login");
// 	}
// });

// // ---------------------------------------------------------------------------- //

// // ----------------------- Admin Edit Participant Teams ----------------------- //

// router.get("/admin/manage/participants", (req, res, next) => {
// 	if (req.user) {
// 		if (req.user.userType != "admin1") {
// 			res.redirect("/dashboard");
// 		} else {
// 			var query1 = {
// 				userType: "user",
// 			};
// 			User.find()
// 				.find(query1)
// 				.sort("time")
// 				.exec(function (err, teams1) {
// 					return res.render("admin-participants", {
// 						teams: teams1,
// 						title: "Participants",
// 						isEdit: true,
// 					});
// 				});
// 		}
// 	} else {
// 		res.redirect("/login");
// 	}
// });

// router.get("/admin/manage/participants/:editUsername", (req, res, next) => {
// 	if (req.user.userType != "admin1" || !req.user.userType) {
// 		res.redirect("/");
// 	}
// 	var query1 = {
// 		userType: "user",
// 	};
// 	var query2 = {
// 		password1: req.params.editUsername,
// 	};
// 	User.find()
// 		.find(query1)
// 		.find(query2)
// 		.exec(function (err, teams) {
// 			return res.render("admin-manage-participants", {
// 				teams: teams,
// 				title: "Manage Participants",
// 				editUsername: req.params.editUsername,
// 			});
// 		});
// });

// router.post("/admin/manage/participants/:editUsername", (req, res, next) => {
// 	var templink = "/admin/manage/participants/" + req.body.editUsername;
// 	User.findOne(
// 		{
// 			username: req.body.editUsername,
// 		},
// 		function (err, user) {
// 			user.username = req.body.newUsername;
// 			user.name = req.body.newName;
// 			user.committee = req.body.newCommittee;
// 			user.allotment = req.body.newAllotment;
// 			user.email = req.body.newEmail;
// 			user.number = req.body.newNumber;
// 			user.userType = req.body.newType;
// 			user.save();
// 		}
// 	);
// 	return res.redirect(templink);
// });

// // ---------------------------------------------------------------------------- //

// // --------------------------- Admin Verified Teams --------------------------- //

// router.get("/admin/verified", (req, res, next) => {
// 	if (req.user) {
// 		if (req.user.userType != "admin1") {
// 			res.redirect("/dashboard");
// 		} else {
// 			var sort = {
// 				type: -1,
// 			};
// 			User.find()
// 				.sort("verified")
// 				.sort(sort)
// 				.exec(function (err, teams1) {
// 					return res.render("admin-verify-list", {
// 						teams: teams1,
// 						title: "Verification Status",
// 					});
// 				});
// 		}
// 	} else {
// 		res.redirect("/login");
// 	}
// });

// // ---------------------------------------------------------------------------- //

// router.get("/admin/manage/admins", (req, res, next) => {
// 	if (req.user) {
// 		if (req.user.userType != "admin1") {
// 			res.redirect("/dashboard");
// 		} else {
// 			return res.render("admin-manage-admins");
// 		}
// 	} else {
// 		res.redirect("/login");
// 	}
// });

// // ---------------------------------------------------------------------------- //

// router.get("/admin/manage/admins/entries", (req, res, next) => {
// 	if (req.user) {
// 		if (req.user.userType != "admin1") {
// 			res.redirect("/dashboard");
// 		} else {
// 			var query1 = {
// 				userType: "admin2",
// 			};
// 			User.find()
// 				.find(query1)
// 				.sort("time")
// 				.exec(function (err, teams1) {
// 					return res.render("admin-admins-entries", {
// 						teams: teams1,
// 						title: "Participants",
// 						isEdit: true,
// 					});
// 				});
// 		}
// 	} else {
// 		res.redirect("/login");
// 	}
// });

// router.get("/admin/manage/admins/entries/:editUsername", (req, res, next) => {
// 	if (req.user.userType != "admin1" || !req.user.userType) {
// 		res.redirect("/");
// 	}
// 	var query1 = {
// 		userType: "admin2",
// 	};
// 	var query2 = {
// 		password1: req.params.editUsername,
// 	};
// 	User.find()
// 		.find(query1)
// 		.find(query2)
// 		.exec(function (err, teams) {
// 			return res.render("admin-manage-admins-entries", {
// 				teams: teams,
// 				title: "Manage Participants",
// 				editUsername: req.params.editUsername,
// 			});
// 		});
// });

// router.post("/admin/manage/admins/entries/:editUsername", (req, res, next) => {
// 	var templink = "/admin/manage/admins/entries/" + req.body.editUsername;
// 	User.findOne(
// 		{
// 			username: req.body.editUsername,
// 		},
// 		function (err, user) {
// 			user.username = req.body.newUsername;
// 			user.name = req.body.newName;
// 			user.committee = req.body.newCommittee;
// 			user.allotment = req.body.newAllotment;
// 			user.email = req.body.newEmail;
// 			user.number = req.body.newNumber;
// 			user.userType = req.body.newType;
// 			user.save();
// 		}
// 	);
// 	return res.redirect(templink);
// });

// // ---------------------------------------------------------------------------- //

// router.get("/admin/manage/admins/allotments", (req, res, next) => {
// 	if (req.user) {
// 		if (req.user.userType != "admin1") {
// 			res.redirect("/dashboard");
// 		} else {
// 			var query1 = {
// 				userType: "admin3",
// 			};
// 			User.find()
// 				.find(query1)
// 				.sort("time")
// 				.exec(function (err, teams1) {
// 					return res.render("admin-admins-allotments", {
// 						teams: teams1,
// 						title: "Participants",
// 						isEdit: true,
// 					});
// 				});
// 		}
// 	} else {
// 		res.redirect("/login");
// 	}
// });

// router.get(
// 	"/admin/manage/admins/allotments/:editUsername",
// 	(req, res, next) => {
// 		if (req.user.userType != "admin1" || !req.user.userType) {
// 			res.redirect("/");
// 		}
// 		var query1 = {
// 			userType: "admin3",
// 		};
// 		var query2 = {
// 			password1: req.params.editUsername,
// 		};
// 		User.find()
// 			.find(query1)
// 			.find(query2)
// 			.exec(function (err, teams) {
// 				return res.render("admin-manage-admins-allotments", {
// 					teams: teams,
// 					title: "Manage Participants",
// 					editUsername: req.params.editUsername,
// 				});
// 			});
// 	}
// );

// router.post(
// 	"/admin/manage/admins/allotments/:editUsername",
// 	(req, res, next) => {
// 		var templink = "/admin/manage/admins/allotments/" + req.body.editUsername;
// 		User.findOne(
// 			{
// 				username: req.body.editUsername,
// 			},
// 			function (err, user) {
// 				user.username = req.body.newUsername;
// 				user.name = req.body.newName;
// 				user.committee = req.body.newCommittee;
// 				user.allotment = req.body.newAllotment;
// 				user.email = req.body.newEmail;
// 				user.number = req.body.newNumber;
// 				user.userType = req.body.newType;
// 				user.save();
// 			}
// 		);
// 		return res.redirect(templink);
// 	}
// );

// --------------------------------------------------------------------------------------------- //

// ----------------------------------------------------------------------------------------------------------------------------------------- //

module.exports = router;
