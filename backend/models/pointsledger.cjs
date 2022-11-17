"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	class PointsLedger extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	PointsLedger.init(
		{
			id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
			user_id: DataTypes.UUID,
			points: DataTypes.FLOAT,
			reason_id: DataTypes.STRING,
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
		},
		{
			sequelize,
			modelName: "PointsLedger",
		}
	);
	return PointsLedger;
};
