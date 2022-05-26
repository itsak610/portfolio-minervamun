// -------------------------------------------------------- Functions and Variables -------------------------------------------------------- //
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/user");
var Committee = require("../models/committees");
var Subscriber = require("../models/subscriber");
var Message = require("../models/message");
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

router.get("/careers", (req, res, next) => {
    return res.render("careers");
});

router.get("/contact", (req, res, next) => {
    return res.render("contact");
});

router.get("/firm", (req, res, next) => {
    return res.render("firm");
});

router.get("/team", (req, res, next) => {
    return res.render("team");
});

router.get("/services", (req, res, next) => {
    return res.render("services");
});

// ----------------------------------------------------------------------------------------------------------------------------------------- //

// --------------------------------------------------------- User Logged In Routes --------------------------------------------------------- //

router.get("/dashboard", (req, res, next) => {
    return res.redirect("/user/dashboard");
});

router.get("/user/dashboard", (req, res, next) => {
    if (req.user) {
        if (req.user.userType == "user") {
            return res.render("dashboard", {
                title: "Dashboard",
            });
        } else {
            return res.redirect("/admin/dashboard");
        }
    } else {
        return res.redirect("/login");
    }
});

router.get("/verify/:id", (req, res, next) => {
    User.findOne({
            verification: req.params.id,
        },
        function(err, user) {
            if (!user) {
                return res.render("error");
            } else {
                user.verified = true;
                user.save();
                return res.render("verified");
            }
        }
    );
});

router.get("/logout", (req, res, next) => {
    req.session.destroy();
    req.logout();
    res.redirect("/login");
});

// ----------------------------------------------------------------------------------------------------------------------------------------- //

// -------------------------------------------------------------- User Routes -------------------------------------------------------------- //

// ---------------------------- User Login Routes ----------------------------  //

router.get("/login", (req, res, next) => {
    if (req.user) {
        return res.redirect("/user/dashboard");
    } else if (!req.user) {
        return res.render("login", {
            title: "Login",
        });
    }
});

router.post("/login", (req, res, next) => {
    passport.authenticate("local", function(err, user) {
        if (err) {
            return res.render("login", {
                title: "Login",
                error: err.message,
            });
        }
        if (!user) {
            return res.render("login", {
                title: "Login",
                error: "Wrong username/password.",
            });
        }
        req.logIn(user, function(err) {
            return res.redirect("/dashboard");
        });
    })(req, res, next);
});

// ----------------------------------------------------------------------------- //

// --------------------------- User Register Routes ---------------------------  //

router.get("/register", (req, res, next) => {
    if (req.user) {
        return res.redirect("/user/dashboard");
    } else {
        Committee.find().exec(function(err, committees) {
            if (err) {
                console.log(err);
            }
            return res.render("register", {
                committees: committees,
            });
        });
    }
});

router.get("/register/:code", (req, res, next) => {
    if (req.user) {
        return res.redirect("/user/dashboard");
    } else {
        var codes = {
            UP: "Uttar Pradesh",
            MH: "Maharashtra",
            BR: "Bihar",
            WB: "West Bengal",
            MP: "Madhya Pradesh",
            TN: "Tamil Nadu",
            RJ: "Rajasthan",
            KA: "Karnataka",
            GJ: "Gujarat",
            AP: "Andhra Pradesh",
            OR: "Orissa",
            TG: "Telangana",
            KL: "Kerala",
            JH: "Jharkhand",
            AS: "Assam",
            PB: "Punjab",
            CT: "Chhattisgarh",
            HR: "Haryana",
            JK: "Jammu and Kashmir",
            UT: "Uttarakhand",
            HP: "Himachal Pradesh",
            TR: "Tripura",
            ML: "Meghalaya",
            MN: "Manipur",
            NL: "Nagaland",
            GA: "Goa",
            AR: "Arunachal Pradesh",
            MZ: "Mizoram",
            SK: "Sikkim",
            DL: "Delhi",
            PY: "Puducherry",
            CH: "Chandigarh",
            AN: "Andaman and Nicobar Islands",
            DN: "Dadra and Nagar Haveli",
            DD: "Daman and Diu",
            LD: "Lakshadweep",
        };
        for (const [key, value] of Object.entries(codes)) {
            if (req.params.code == key) {
                return res.render("register", {
                    title: "Register",
                    stateSelect: true,
                    stateSelection: value,
                });
            }
        }
        return res.redirect("/register");
    }
});

router.post("/register", (req, res) => {
    if (req.body.password != req.body.passwordConfirm) {
        return res.render("register", {
            title: "Register",
            error: "The passwords dont match.",
            errorcode: "red",
        });
    } else {
        User.findOne({
                username: req.body.email,
            },
            function(err, user) {
                if (!user) {
                    var verifyid = makeid(64);
                    var editedUsername = req.body.email.substring(
                        0,
                        req.body.email.indexOf("@")
                    );
                    User.register(
                        new User({
                            userType: "user",
                            username: editedUsername,
                            email: req.body.email,
                            name: req.body.name,
                            number: req.body.number,
                            committee: req.body.committee,
                            allotment: req.body.allotment,
                            city: req.body.city,
                            verification: verifyid,
                            password1: req.body.password,
                            time: new Date(),
                        }),
                        req.body.password,
                        function(err, user) {
                            if (err) {
                                return res.render("register", {
                                    title: "Register",
                                    error: "The email is already registered.",
                                    errorcode: "red",
                                });
                            } else {
                                return res.render("register", {
                                    isRedirect: true,
                                    title: "Student Register",
                                    error: "User registered successfully.",
                                    errorcode: "blue",
                                });
                            }
                        }
                    );
                } else {
                    return res.render("register", {
                        title: "Register",
                        error: "The email is already registered.",
                        errorcode: "red",
                    });
                }
            }
        );
    }
});

// ----------------------------------------------------------------------------- //

router.post("/subscribe", (req, res) => {
    var templink = req.body.urllink.replace("/", "");
    console.log(templink);
    User.findOne({
            email: req.body.email,
        },

        function(err, user) {
            if (!user) {
                Subscriber.addSubscriber(req.body.email, (err) => {
                    if (err) {
                        return res.render(templink, {
                            suberror: "The email is already subscribed",
                        });
                    }
                    return res.render(templink, {
                        suberror: "Email subscribed successfully.",
                    });
                });
            } else {
                return res.render(templink, {
                    suberror: "The email is already subscribed.",
                });
            }
            return res.render(templink, {
                suberror: "Email subscribed successfully.",
            });
        }
    );
});

router.post("/send/message", (req, res) => {
    User.findOne({
            email: req.body.email,
        },

        function(err, user) {
            if (!user) {
                Message.addMessage(
                    req.body.name,
                    req.body.email,
                    req.body.message,
                    (err) => {
                        console.log("msg");
                        if (err) {
                            console.log("a");
                            return res.render("contact", {
                                msgerror: "err",
                            });
                        } else {
                            console.log("b");
                            return res.render("contact", {
                                msgerror: "Message sent successfully.",
                            });
                        }
                    }
                );
            } else {
                Message.addMessage(
                    req.body.name,
                    req.body.email,
                    req.body.message,
                    (err) => {
                        console.log("msg");
                        if (err) {
                            console.log("a");
                            return res.render("contact", {
                                msgerror: "err",
                            });
                        } else {
                            console.log("b");
                            return res.render("contact", {
                                msgerror: "Message sent successfully.",
                            });
                        }
                    }
                );
            }
        }
    );
});

// ----------------------------------------------------------------------------------------------------------------------------------------- //

// ------------------------------------------------------------- Admin Routes -------------------------------------------------------------  //

// ------------------------------------ Admin Panel Routes ------------------------------------  //

// ----------------------------- Admin Dashboard -----------------------------  //

router.get("/admin", (req, res) => {
    if (req.user) {
        if (
            req.user.userType == "admin1" ||
            req.user.userType == "admin2" ||
            req.user.userType == "admin3"
        ) {
            res.redirect("/admin/dashboard");
        } else {
            res.redirect("/dashboard");
        }
    } else {
        res.redirect("/login");
    }
});

router.get("/admin/dashboard", (req, res) => {
    if (req.user) {
        if (
            req.user.userType != "admin1" &&
            req.user.userType != "admin2" &&
            req.user.userType != "admin3"
        ) {
            res.redirect("/dashboard");
        } else {
            if (req.user.userType == "admin1") {
                return res.render("admin-1-dashboard", {
                    title: "Admin Panel",
                    adminType: "admin1",
                });
            } else if (req.user.userType == "admin2") {
                return res.render("admin-1-dashboard", {
                    title: "Admin Panel",
                    adminType: "admin2",
                });
            } else {
                return res.render("admin-1-dashboard", {
                    title: "Admin Panel",
                    adminType: "admin3",
                });
            }
        }
    } else {
        res.redirect("/login");
    }
});

// ---------------------------------------------------------------------------- //

// ---------------------------- Admin Manage Teams ---------------------------- //

router.get("/admin/entries", (req, res, next) => {
    if (req.user) {
        if (req.user.userType != "admin2" && req.user.userType != "admin1") {
            res.redirect("/dashboard");
        } else {
            var query1 = {
                userType: "user",
            };
            User.find()
                .find(query1)
                .exec(function(err, teams) {
                    return res.render("admin-view-entries", {
                        teams: teams,
                        title: "View Entries",
                    });
                });
        }
    } else {
        res.redirect("/login");
    }
});

// ---------------------------------------------------------------------------- //

// ------------------------------- Admin Events ------------------------------- //

router.get("/admin/committees", (req, res, next) => {
    if (req.user) {
        if (req.user.userType != "admin3" && req.user.userType != "admin1") {
            res.redirect("/dashboard");
        } else {
            Committee.find()
                .sort("CommitteeName")
                .exec(function(err, committees) {
                    return res.render("admin-view-committees", {
                        committees: committees,
                        title: "Committees",
                    });
                });
        }
    } else {
        res.redirect("/login");
    }
});

// ---------------------------------------------------------------------------- //

// ---------------------------- Admin Event Teams ----------------------------  //

router.get("/admin/committees/:committee/allotment", (req, res, next) => {
    if (req.user) {
        if (req.user.userType == "user") {
            res.redirect("/dashboard");
        } else {
            var query1 = {
                userType: "user",
            };
            var query2 = {
                CommitteeCode: req.params.committee,
            };
            User.find()
                .find(query1)
                .find(query2)
                .sort("allotment")
                .exec(function(err, teams) {
                    return res.render("admin-committee-allotment", {
                        teams: teams,
                        title: req.params.committee + " Allotment",
                        comcode: req.params.committee,
                    });
                });
        }
    } else {
        res.redirect("/login");
    }
});

// ---------------------------------------------------------------------------- //

// -------------------------- Admin Student Details --------------------------  //

router.get("/admin/participant/:id", (req, res, next) => {
    if (req.user) {
        if (
            req.user.userType != "admin1" &&
            req.user.userType != "admin2" &&
            req.user.userType != "admin3"
        ) {
            res.redirect("/dashboard");
        } else {
            var query1 = {
                userType: "user",
            };
            var query2 = {
                username: req.params.id,
            };
            User.find()
                .find(query1)
                .find(query2)
                .exec(function(err, teams) {
                    if (teams.length == 0) {
                        return res.render("error");
                    } else {
                        return res.render("admin-participant-details", {
                            teams: teams,
                            title: "Participant Details",
                        });
                    }
                });
        }
    } else {
        res.redirect("/login");
    }
});

// ---------------------------------------------------------------------------- //

// ----------------------- Admin Edit Participant Teams ----------------------- //

router.get("/admin/manage/entries/:editUsername", (req, res, next) => {
    if (req.user) {
        if (req.user.userType != "admin1") {
            res.redirect("/dashboard");
        } else {
            var query1 = {
                userType: "user",
            };
            var query2 = {
                username: req.params.editUsername,
            };
            User.find()
                .find(query1)
                .find(query2)
                .exec(function(err, teams) {
                    return res.render("admin-manage-entries", {
                        teams: teams,
                        title: "Participants",
                        editUsername: req.params.editUsername,
                    });
                });
        }
    } else {
        res.redirect("/login");
    }
});

router.post("/admin/manage/entries/:editUsername", (req, res, next) => {
    User.findOne({
            username: req.body.editUsername,
        },
        function(err, user) {
            console.log(user);
            user.username = req.body.newUsername;
            user.name = req.body.newName;
            user.committee = req.body.newCommittee;
            user.committeeCode = req.body.newCommitteeCode;
            user.allotment = req.body.newAllotment;
            user.email = req.body.newEmail;
            user.number = req.body.newNumber;
            user.userType = req.body.newType;
            user.save();
        }
    );
    return res.redirect("/admin/manage/entries");
});

// ---------------------------------------------------------------------------- //

router.get("/admin/manage/admins", (req, res, next) => {
    if (req.user) {
        if (req.user.userType != "admin1") {
            res.redirect("/dashboard");
        } else {
            var query1 = {
                userType: { $ne: "user" },
            };
            User.find()
                .find(query1)
                .sort("time")
                .exec(function(err, teams) {
                    return res.render("admin-view-admins", {
                        teams: teams,
                        title: "Admins",
                        isEdit: true,
                    });
                });
        }
    } else {
        res.redirect("/login");
    }
});

router.get("/admin/manage/admins/:editUsername", (req, res, next) => {
    if (req.user.userType != "admin1" || !req.user.userType) {
        res.redirect("/");
    }
    var query1 = {
        userType: { $ne: "user" },
    };
    var query2 = {
        username: req.params.editUsername,
    };
    User.find()
        .find(query1)
        .find(query2)
        .exec(function(err, teams) {
            return res.render("admin-manage-admins", {
                teams: teams,
                title: "Manage Admins",
                editUsername: req.params.editUsername,
            });
        });
});

router.post("/admin/manage/admins/:editUsername", (req, res, next) => {
    var templink = "/admin/manage/admins/" + req.body.editUsername;
    User.findOne({
            username: req.body.editUsername,
        },
        function(err, user) {
            user.username = req.body.newUsername;
            user.name = req.body.newName;
            user.committee = req.body.newCommittee;
            user.allotment = req.body.newAllotment;
            user.email = req.body.newEmail;
            user.number = req.body.newNumber;
            user.userType = req.body.newType;
            user.save();
        }
    );
    return res.redirect(templink);
});

// ---------------------------------------------------------------------------- //

router.get("/admin/add-committee", (req, res, next) => {
    if (req.user.userType != "admin1") {
        res.redirect("/");
    }
    return res.render("admin-add-committee", { title: "Add Committee" });
});

//ADD A QUES
router.post("/admin/add-committee", (req, res, next) => {
    Committee.addCommittee(
        req.body.CommitteeName,
        req.body.CommitteeCode,
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        (err) => {
            if (err) {
                return res.render("admin-add-committee", {
                    error: "Committee already exists.",
                    title: "Add Committee",
                });
            }
            return res.render("admin-add-committee", {
                error: "Committee created successfully.",
                title: "Add Committee",
            });
        }
    );
});

// --------------------------------------------------------------------------------------------- //

// ----------------------------------------------------------------------------------------------------------------------------------------- //

module.exports = router;