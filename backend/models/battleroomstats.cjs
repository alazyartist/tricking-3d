"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	class BattleRoomStats extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ BattleRooms }) {
			// define association here
			this.belongsTo(BattleRooms, {
				foreignKey: "sessionid",
				targetKey: "sessionid",
				sourceKey: "sessionid",
			});
		}
	}
	BattleRoomStats.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			sessionid: { type: DataTypes.UUID, unique: true },
			team1Score: DataTypes.INTEGER,
			team2Score: DataTypes.INTEGER,
			team1AudienceScore: DataTypes.INTEGER,
			team2AudienceScore: DataTypes.INTEGER,
			winner: DataTypes.JSON,
			audienceWinner: DataTypes.JSON,
			createdAt: {
				type: DataTypes.DATE,
			},
			updatedAt: {
				type: DataTypes.DATE,
			},
			deletedAt: {
				type: DataTypes.DATE,
			},
		},
		{
			sequelize,
			paranoid: true,
			modelName: "BattleRoomStats",
		}
	);
	return BattleRoomStats;
};
