"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	class Stances extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ Bases, Tricks }) {
			// define association here
			this.hasOne(Tricks, { foreignKey: "stance_id" });
		}
	}
	Stances.init(
		{
			stance_id: { type: DataTypes.STRING, primaryKey: true },
			type: { type: DataTypes.STRING, defaultValue: "Stance" },
			name: DataTypes.STRING,
			leg: DataTypes.STRING,
			direction: DataTypes.STRING,
			stanceRotation: DataTypes.INTEGER,
			pointValue: DataTypes.INTEGER,
		},
		{
			sequelize,
			timestamps: false,
			modelName: "Stances",
		}
	);
	return Stances;
};
