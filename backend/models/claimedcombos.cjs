"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	class ClaimedCombos extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	ClaimedCombos.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			user_id: DataTypes.UUID,
			combo_id: DataTypes.UUID,
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE,
		},
		{
			sequelize,
			modelName: "ClaimedCombos",
		}
	);
	return ClaimedCombos;
};
