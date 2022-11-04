"use strict";
const { Model, DataTypes } = require("sequelize");
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
			id: DataTypes.UUID,
			srcid: DataTypes.UUID,
			sessionid: DataTypes.UUID,
			clipLabel: DataTypes.UUID,
			clipStart: DataTypes.STRING,
			clipEnd: DataTypes.STRING,
			admin: DataTypes.UUID,
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE,
		},
		{
			sequelize,
			modelName: "SessionData",
		}
	);
	return SessionData;
};
