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
		static associate({ SessionSummaries, SessionSources, Combo }) {
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
		}
	}
	SessionData.init(
		{
			id: { type: DataTypes.UUID, primaryKey: true, defaultValue: uuidv4() },
			srcid: DataTypes.UUID,
			sessionid: DataTypes.UUID,
			clipLabel: DataTypes.UUID,
			clipStart: DataTypes.STRING,
			clipEnd: DataTypes.STRING,
			admin: DataTypes.UUID,
			bail: DataTypes.INTEGER,
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE,
			executionAverage: DataTypes.FLOAT,
			totalScore: DataTypes.FLOAT,
		},
		{
			sequelize,
			modelName: "SessionData",
		}
	);
	return SessionData;
};
