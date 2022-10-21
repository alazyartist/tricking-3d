"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	class BattleRooms extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ BattleRoomStats }) {
			// define association here
			this.hasOne(BattleRoomStats, {
				foreignKey: "sessionid",
				sourceKey: "sessionid",
				targetkey: "sessionid",
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
