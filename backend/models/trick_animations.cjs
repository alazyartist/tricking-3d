"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	class Trick_Animations extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Trick_Animations.init(
		{
			trick_id: DataTypes.UUID,
			animation_id: DataTypes.UUID,
		},
		{
			sequelize,
			modelName: "Trick_Animations",
		}
	);
	return Trick_Animations;
};
