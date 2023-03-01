"use strict";
const { Model, DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize) => {
	class SessionData extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ SessionSummaries, SessionSources, Combo, Users }) {
			// define association here
			this.belongsTo(SessionSources, {
				foreignKey: "srcid",
				sourceKey: "srcid",
				targetKey: "srcid",
				constraints: false,
			});
			this.belongsTo(SessionSummaries, {
				foreignKey: "sessionid",
				sourceKey: "sessionid",
				targetKey: "sessionid",
				constraints: false,
			});
			this.hasOne(Combo, {
				as: "ClipLabel",
				foreignKey: "combo_id",
				sourceKey: "clipLabel",
				targetKey: "combo_id",
				constraints: false,
			});
			this.hasOne(Users, {
				as: "tricker",
				foreignKey: "uuid",
				sourceKey: "tricker_id",
				targetKey: "uuid",
				constraints: false,
			});
		}
	}
	SessionData.init(
		{
			id: { type: DataTypes.UUID, primaryKey: true, defaultValue: uuidv4() },
			srcid: DataTypes.UUID,
			sessionid: DataTypes.UUID,
			clipLabel: DataTypes.UUID,
			tricker_id: DataTypes.UUID,
			clipStart: DataTypes.STRING,
			clipEnd: DataTypes.STRING,
			admin: DataTypes.UUID,
			bail: DataTypes.INTEGER,
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE,
			executionAverage: DataTypes.FLOAT,
			totalScore: DataTypes.FLOAT,
			varietyScore: DataTypes.FLOAT,
			powerScore: DataTypes.FLOAT,
			chains: DataTypes.JSON,
			chainTotal: DataTypes.FLOAT,
			chainMap: DataTypes.JSON,
			varietyMap: DataTypes.JSON,
			trickCount: DataTypes.JSON,
		},
		{
			sequelize,
			modelName: "SessionData",
		}
	);
	return SessionData;
};
