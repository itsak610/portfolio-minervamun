var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AllotmentSchema = new Schema({
    Portfolio: String,
    ComName: String,
    ComCode: String,
    ComState: String,
    ComCity: String,
    Allotted: {
        type: String,
        default: "",
    },
});

AllotmentSchema.statics.addAllotment = function(
    Portfolio,
    ComName,
    ComCode,
    ComState,
    ComCity,
    Allotted,
    callback
) {
    var qs = new Allotment({
        Portfolio: Portfolio,
        ComName: ComName,
        ComCode: ComCode,
        ComState: ComState,
        ComCity: ComCity,
        Allotted: Allotted,
    });
    qs.save(function(err) {
        if (err) {
            return callback(err);
        } else {
            return callback(null, qs);
        }
    });
};

var Allotment = mongoose.model("Allotment", AllotmentSchema);
module.exports = Allotment;