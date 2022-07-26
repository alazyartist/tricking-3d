"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	class Bases extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ Stances, Tricks }) {
			// define association here
		}
	}
	Bases.init(
		{
			base_id: {
				type: DataTypes.STRING,
				primaryKey: true,
			},
			trick_id: {
				type: DataTypes.UUID,
			},
			name: DataTypes.STRING,
			direction: DataTypes.STRING,
			fromLeg: DataTypes.STRING,
			toLeg: DataTypes.STRING,
			rotation: DataTypes.INTEGER,
			stance_id: {
				type: DataTypes.STRING,
				references: {
					model: "Stances",
					key: "stance_id",
				},
			},
			takeoffStance: {
				type: DataTypes.STRING,
			},
			landingStance: {
				type: DataTypes.STRING,
			},
		},
		{
			sequelize,
			timestamps: false,
			modelName: "Bases",
		}
	);
	return Bases;
};
