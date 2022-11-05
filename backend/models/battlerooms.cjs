"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	class BattleRooms extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ BattleRoomStats, Users, UserScores, JudgeScores }) {
			// define association here
			this.belongsTo(Users, {
				foreignKey: "host",
				sourceKey: "host",
				targetKey: "uuid",
				constraints: false,
			});
			this.hasOne(BattleRoomStats, {
				foreignKey: "sessionid",
				sourceKey: "sessionid",
				targetkey: "sessionid",
			});
			this.hasMany(UserScores, {
				foreignKey: "sessionid",
				targetKey: "sessionid",
				sourceKey: "sessionid",
			});
			this.hasMany(JudgeScores, {
				foreignKey: "sessionid",
				targetKey: "sessionid",
				sourceKey: "sessionid",
				constraints: false,
			});
		}
	}
	BattleRooms.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			host: DataTypes.UUID,
			sessionid: { type: DataTypes.UUID, unique: true },
			team1: DataTypes.JSON,
			team2: DataTypes.JSON,
			judges: DataTypes.JSON,
			duration: DataTypes.INTEGER,
			isOpen: DataTypes.BOOLEAN,
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
			underscored: false,
			modelName: "BattleRooms",
		}
	);
	return BattleRooms;
};
