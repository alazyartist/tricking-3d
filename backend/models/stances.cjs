"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	class Stances extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ Bases }) {
			// define association here
			this.hasOne(Bases);
		}
	}
	Stances.init(
		{
			stance_id: { type: DataTypes.STRING, primaryKey: true },
			name: DataTypes.STRING,
			leg: DataTypes.STRING,
			direction: DataTypes.STRING,
			stanceRotation: DataTypes.INTEGER,
		},
		{
			sequelize,
			timestamps: false,
			modelName: "Stances",
		}
	);
	return Stances;
};
