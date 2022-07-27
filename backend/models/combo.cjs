"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	class Combo extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Combo.init(
		{
			combo_id: DataTypes.UUID,
			owner: DataTypes.UUID,
			name: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Combo",
		}
	);
	return Combo;
};
