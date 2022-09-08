"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	class Variations extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ Tricks }) {
			// define association here
			this.belongsToMany(Tricks, {
				as: "Potential Tricks",
				through: "Trick_Variations",
				foreignKey: "variation_id",
				sourceKey: "id",
			});
		}
	}
	Variations.init(
		{
			id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
			type: { type: DataTypes.STRING, defaultValue: "Variation" },
			variationType: DataTypes.STRING,
			name: DataTypes.STRING,
			value: DataTypes.STRING,
			pos: DataTypes.STRING,
		},
		{
			timestamps: false,
			sequelize,
			modelName: "Variations",
		}
	);
	return Variations;
};
