"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	class ClaimedTricks extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	ClaimedTricks.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			user_id: DataTypes.UUID,
			trick_id: DataTypes.UUID,
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE,
		},
		{
			sequelize,
			modelName: "ClaimedTricks",
		}
	);
	return ClaimedTricks;
};
