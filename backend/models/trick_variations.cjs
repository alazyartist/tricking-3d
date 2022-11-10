"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	class Trick_Variations extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ Variations, Tricks }) {
			// define association here
			this.belongsTo(Variations, {
				foreignKey: "variation_id",
				sourceKey: "id",
			});
			this.belongsTo(Tricks, {
				foreignKey: "trick_id",
				sourceKey: "trick_id",
			});
		}
	}
	Trick_Variations.init(
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
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
