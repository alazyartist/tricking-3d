"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	class User_Tricklists extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	User_Tricklists.init(
		{
			user_id: DataTypes.UUID,
			tricklist_id: DataTypes.UUID,
		},
		{
			sequelize,
			modelName: "User_Tricklists",
		}
	);
	return User_Tricklists;
};
