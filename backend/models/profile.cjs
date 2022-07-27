"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	class Profile extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Profile.init(
		{
			user_id: DataTypes.UUID,
			name: DataTypes.STRING,
			age: DataTypes.INTEGER,
			country: DataTypes.STRING,
			state: DataTypes.STRING,
			city: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Profile",
		}
	);
	return Profile;
};
