"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	class Combo_Tricks extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Combo_Tricks.init(
		{
			id: { type: DataTypes.INTEGER, primaryKey: true },
			combo_id: DataTypes.UUID,
			trick_id: DataTypes.UUID,
		},
		{
			sequelize,
			modelName: "Combo_Tricks",
		}
	);
	return Combo_Tricks;
};
