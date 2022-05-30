var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CommitteeSchema = new Schema({
    CommitteeName: String,
    CommitteeCode: String,
    CommitteeState: String,
    CommitteeCity: String,
});

CommitteeSchema.statics.addCommittee = function(
    CommitteeName,
    CommitteeCode,
    CommitteeState,
    CommitteeCity,
    callback
) {
    var qs = new Committee({
        CommitteeName: CommitteeName,
        CommitteeCode: CommitteeCode,
        CommitteeState: CommitteeState,
        CommitteeCity: CommitteeCity,
    });
    qs.save(function(err) {
        if (err) {
            return callback(err);
        } else {
            return callback(null, qs);
        }
    });
};

var Committee = mongoose.model("Committee", CommitteeSchema);
module.exports = Committee;