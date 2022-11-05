"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	class SessionSummaries extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ Users, SessionSources, SessionData }) {
			// define association here
			this.belongsTo(Users, {
				foreignKey: "user_id",
				sourceKey: "user_id",
				targetKey: "uuid",
				constraints: false,
			});
			this.hasMany(SessionSources, {
				foreignKey: "sessionid",
				sourceKey: "sessionid",
				targetKey: "sessionid",
				constraints: false,
			});
			this.hasMany(SessionData, {
				foreignKey: "sessionid",
				sourceKey: "sessionid",
				targetKey: "sessionid",
				constraints: false,
			});
		}
	}
	SessionSummaries.init(
		{
			sessionid: { primaryKey: true, type: DataTypes.UUID },
			name: DataTypes.STRING,
			user_id: DataTypes.UUID,
			admin: DataTypes.UUID,
			sessionDate: DataTypes.DATEONLY,
			startTime: DataTypes.STRING,
			endTime: DataTypes.STRING,
			status: DataTypes.STRING,
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE,
		},
		{
			sequelize,
			modelName: "SessionSummaries",
		}
	);
	return SessionSummaries;
};
