"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	class JudgeScores extends Model {
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
				constraints: false,
			});
		}
	}
	JudgeScores.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			sessionid: DataTypes.UUID,
			judge: DataTypes.UUID,
			team: DataTypes.JSON,
			score: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "JudgeScores",
		}
	);
	return JudgeScores;
};
