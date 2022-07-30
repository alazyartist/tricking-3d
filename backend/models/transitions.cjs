"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	class Transitions extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Transitions.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			name: DataTypes.STRING,
			type: { type: DataTypes.STRING, defaultValue: "Transition" },
			transitionType: DataTypes.STRING,
			takeoffStyle: DataTypes.STRING,
			landingStyle: DataTypes.STRING,
			fromLeg: DataTypes.STRING,
			toLeg: DataTypes.STRING,
			rotation: DataTypes.INTEGER,
		},
		{ timestamps: false, sequelize, modelName: "Transitions" }
	);
	return Transitions;
};
