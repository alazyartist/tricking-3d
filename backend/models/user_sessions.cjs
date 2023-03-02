"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	class User_Sessions extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ Users, SessionSummaries }) {
			// define association here
			this.belongsTo(Users, { foreignKey: "uuid", sourceKey: "user_id" });
			this.belongsTo(SessionSummaries, {
				foreignKey: "sessionid",
				sourceKey: "sessionid",
			});
		}
	}
	User_Sessions.init(
		{
			id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
			user_id: DataTypes.UUID,
			sessionid: DataTypes.UUID,
		},
		{
			sequelize,
			modelName: "User_Sessions",
		}
	);
	return User_Sessions;
};
