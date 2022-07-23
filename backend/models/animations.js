"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	class Animations extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Animations.init(
		{
			animation_id: { type: DataTypes.UUID, primaryKey: true },
			animationName: DataTypes.STRING,
			trick_id: {
				type: DataTypes.UUID,
				references: { model: "Tricks", key: "trick_id" },
			},
			skeleton: DataTypes.STRING,
			fileName: DataTypes.STRING,
			model: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Animations",
		}
	);
	return Animations;
};
