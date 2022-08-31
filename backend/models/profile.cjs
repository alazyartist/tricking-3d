"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	class Profile extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ Users }) {
			// define association here
			this.belongsTo(Users, { foreignKey: "user_id", targetKey: "uuid" });
		}
	}
	Profile.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			user_id: DataTypes.UUID,
			name: DataTypes.STRING,
			status: DataTypes.STRING,
			socials: DataTypes.JSON,
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
