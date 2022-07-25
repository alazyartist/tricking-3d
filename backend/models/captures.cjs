"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	class Captures extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Captures.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			user_id: {
				type: DataTypes.INTEGER,
				references: { model: "Users", key: "id" },
			},

			captured_id: {
				type: DataTypes.INTEGER,
				references: { model: "Users", key: "id" },
			},
			createdAt: {
				type: DataTypes.DATE,
			},
			updatedAt: {
				type: DataTypes.DATE,
			},
		},
		{
			sequelize,
			modelName: "Captures",
		}
	);
	return Captures;
};
