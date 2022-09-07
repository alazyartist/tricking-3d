"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	class Trick_Variations extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Trick_Variations.init(
		{
			id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
			variation_id: {
				type: DataTypes.INTEGER,
				references: { model: "Variations", key: "id" },
			},
			trick_id: {
				type: DataTypes.UUID,
				references: { model: "Tricks", key: "trick_id" },
			},
		},
		{
			timestamps: false,
			sequelize,
			modelName: "Trick_Variations",
		}
	);
	return Trick_Variations;
};
