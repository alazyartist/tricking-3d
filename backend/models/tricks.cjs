"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	class Tricks extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Tricks.init(
		{
			trick_id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			base_id: {
				type: DataTypes.STRING,
				references: { model: "Bases", key: "base_id" },
			},
			name: DataTypes.STRING,
			stance_id: {
				type: DataTypes.STRING,
				references: { model: "Stances", key: "stance_id" },
			},
			takeoffStance_id: DataTypes.STRING,
			landingStance_id: DataTypes.STRING,
			variations_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Tricks",
		}
	);
	return Tricks;
};
