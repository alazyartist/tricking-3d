"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	class Interactions extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Interactions.init(
		{
			user_id: {
				type: DataTypes.INTEGER,
				references: { model: "Users", key: "id" },
			},
			interaction_id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			trick_id: {
				type: DataTypes.UUID,
			},
			type: DataTypes.STRING,
			content: DataTypes.STRING,
			createdAt: {
				type: DataTypes.DATE,
			},
			updatedAt: {
				type: DataTypes.DATE,
			},
		},
		{
			sequelize,
			modelName: "Interactions",
		}
	);
	return Interactions;
};
