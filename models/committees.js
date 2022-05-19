var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CommitteeSchema = new Schema({
	CommitteeName: String,
	Afghanistan: {
		type: String,
		default: "",
	},
	Albania: {
		type: String,
		default: "",
	},
	Algeria: {
		type: String,
		default: "",
	},
	Andorra: {
		type: String,
		default: "",
	},
	Angola: {
		type: String,
		default: "",
	},
	Argentina: {
		type: String,
		default: "",
	},
	Armenia: {
		type: String,
		default: "",
	},
	Australia: {
		type: String,
		default: "",
	},
	Bangladesh: {
		type: String,
		default: "",
	},
	Belgium: {
		type: String,
		default: "",
	},
	Brazil: {
		type: String,
		default: "",
	},
	BurkinaFaso: {
		type: String,
		default: "",
	},
	Cameroon: {
		type: String,
		default: "",
	},
	Canada: {
		type: String,
		default: "",
	},
	Chile: {
		type: String,
		default: "",
	},
	China: {
		type: String,
		default: "",
	},
	DPRK: {
		type: String,
		default: "",
	},
	Egypt: {
		type: String,
		default: "",
	},
	Ethiopia: {
		type: String,
		default: "",
	},
	France: {
		type: String,
		default: "",
	},
	Germany: {
		type: String,
		default: "",
	},
	India: {
		type: String,
		default: "",
	},
	Iraq: {
		type: String,
		default: "",
	},
	Japan: {
		type: String,
		default: "",
	},
	Malaysia: {
		type: String,
		default: "",
	},
	Micronesia: {
		type: String,
		default: "",
	},
	Morocco: {
		type: String,
		default: "",
	},
	NewZealand: {
		type: String,
		default: "",
	},
	Netherlands: {
		type: String,
		default: "",
	},
	Norway: {
		type: String,
		default: "",
	},
	Pakistan: {
		type: String,
		default: "",
	},
	RepublicofKorea: {
		type: String,
		default: "",
	},
	RussianFederation: {
		type: String,
		default: "",
	},
	Singapore: {
		type: String,
		default: "",
	},
	SouthAfrica: {
		type: String,
		default: "",
	},
	Spain: {
		type: String,
		default: "",
	},
	SriLanka: {
		type: String,
		default: "",
	},
	Switzerland: {
		type: String,
		default: "",
	},
	Turkey: {
		type: String,
		default: "",
	},
	Ukraine: {
		type: String,
		default: "",
	},
	UnitedKingdom: {
		type: String,
		default: "",
	},
	UnitedStatesofAmerica: {
		type: String,
		default: "",
	},
	Venezuela: {
		type: String,
		default: "",
	},
	Vietnam: {
		type: String,
		default: "",
	},
	Zimbabwe: {
		type: String,
		default: "",
	},
});

CommitteeSchema.statics.addCommittee = function (
	CommitteeName,
	Afghanistan,
	Albania,
	Algeria,
	Andorra,
	Angola,
	Argentina,
	Armenia,
	Australia,
	Bangladesh,
	Belgium,
	Brazil,
	BurkinaFaso,
	Cameroon,
	Canada,
	Chile,
	China,
	DPRK,
	Egypt,
	Ethiopia,
	France,
	Germany,
	India,
	Iraq,
	Japan,
	Malaysia,
	Micronesia,
	Morocco,
	NewZealand,
	Netherlands,
	Norway,
	Pakistan,
	RepublicofKorea,
	RussianFederation,
	Singapore,
	SouthAfrica,
	Spain,
	SriLanka,
	Switzerland,
	Turkey,
	Ukraine,
	UnitedKingdom,
	UnitedStatesofAmerica,
	Venezuela,
	Vietnam,
	Zimbabwe,
	callback
) {
	var qs = new Committee({
		CommitteeName: CommitteeName,
		Afghanistan: Afghanistan,
		Albania: Albania,
		Algeria: Algeria,
		Andorra: Andorra,
		Angola: Angola,
		Argentina: Argentina,
		Armenia: Armenia,
		Australia: Australia,
		Bangladesh: Bangladesh,
		Belgium: Belgium,
		Brazil: Brazil,
		BurkinaFaso: BurkinaFaso,
		Cameroon: Cameroon,
		Canada: Canada,
		Chile: Chile,
		China: China,
		DPRK: DPRK,
		Egypt: Egypt,
		Ethiopia: Ethiopia,
		France: France,
		Germany: Germany,
		India: India,
		Iraq: Iraq,
		Japan: Japan,
		Malaysia: Malaysia,
		Micronesia: Micronesia,
		Morocco: Morocco,
		NewZealand: NewZealand,
		Netherlands: Netherlands,
		Norway: Norway,
		Pakistan: Pakistan,
		RepublicofKorea: RepublicofKorea,
		RussianFederation: RussianFederation,
		Singapore: Singapore,
		SouthAfrica: SouthAfrica,
		Spain: Spain,
		SriLanka: SriLanka,
		Switzerland: Switzerland,
		Turkey: Turkey,
		Ukraine: Ukraine,
		UnitedKingdom: UnitedKingdom,
		UnitedStatesofAmerica: UnitedStatesofAmerica,
		Venezuela: Venezuela,
		Vietnam: Vietnam,
		Zimbabwe: Zimbabwe,
	});
	qs.save(function (err) {
		if (err) {
			return callback(err);
		} else {
			return callback(null, qs);
		}
	});
};

CommitteeSchema.statics.getCommittee = function (level, callback) {
	Committee.findOne({ CommitteeName: CommitteeName }).exec(function (
		err,
		CommitteeName
	) {
		return callback(
			CommitteeName.Afghanistan,
			CommitteeName.Albania,
			CommitteeName.Algeria,
			CommitteeName.Andorra,
			CommitteeName.Angola,
			CommitteeName.Argentina,
			CommitteeName.Armenia,
			CommitteeName.Australia,
			CommitteeName.Bangladesh,
			CommitteeName.Belgium,
			CommitteeName.Brazil,
			CommitteeName.BurkinaFaso,
			CommitteeName.Cameroon,
			CommitteeName.Canada,
			CommitteeName.Chile,
			CommitteeName.China,
			CommitteeName.DPRK,
			CommitteeName.Egypt,
			CommitteeName.Ethiopia,
			CommitteeName.France,
			CommitteeName.Germany,
			CommitteeName.India,
			CommitteeName.Iraq,
			CommitteeName.Japan,
			CommitteeName.Malaysia,
			CommitteeName.Micronesia,
			CommitteeName.Morocco,
			CommitteeName.NewZealand,
			CommitteeName.Netherlands,
			CommitteeName.Norway,
			CommitteeName.Pakistan,
			CommitteeName.RepublicofKorea,
			CommitteeName.RussianFederation,
			CommitteeName.Singapore,
			CommitteeName.SouthAfrica,
			CommitteeName.Spain,
			CommitteeName.SriLanka,
			CommitteeName.Switzerland,
			CommitteeName.Turkey,
			CommitteeName.Ukraine,
			CommitteeName.UnitedKingdom,
			CommitteeName.UnitedStatesofAmerica,
			CommitteeName.Venezuela,
			CommitteeName.Vietnam,
			CommitteeName.Zimbabwe
		);
	});
};

var Committee = mongoose.model("Committee", CommitteeSchema);
module.exports = Committee;
