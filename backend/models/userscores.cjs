"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	class UserScores extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ BattleRooms }) {
			// define association here
			this.belongsToMany(BattleRooms, {
				through: "RoomUserScores",
				foreignKey: "sessionid",
				targetKey: "sessionid",
			});
		}
	}
	UserScores.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			sessionid: DataTypes.UUID,
			userid: DataTypes.UUID,
			team: DataTypes.JSON,
			score: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "UserScores",
		}
	);
	return UserScores;
};
