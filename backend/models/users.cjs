"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	class Users extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ Users, Captures }) {
			// define association here
			this.belongsToMany(Users, {
				through: Captures,
				as: "mainUser",
				foreignKey: "user_id",
				sourceKey: "id",
				targetKey: "id",
			});
			this.belongsToMany(Users, {
				through: Captures,
				as: "Captured",
				foreignKey: "captured_id",
				sourceKey: "id",
				targetKey: "id",
			});
		}
	}
	Users.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			username: {
				type: DataTypes.STRING,
				len: [2, 50],
				allowNull: true,
				unique: true,
			},
			first_name: {
				type: DataTypes.STRING,
			},
			last_name: {
				type: DataTypes.STRING,
				required: true,
			},
			email: {
				type: DataTypes.STRING,
				isEmail: true,
				required: true,
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				required: true,
				allowNull: false,
			},
			refreshToken: {
				field: "refresh_token",
				type: DataTypes.STRING,
			},
			uuid: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
			},
			profilePic: {
				type: DataTypes.STRING,
			},

			createdAt: {
				type: DataTypes.DATE,
			},
			updatedAt: {
				type: DataTypes.DATE,
			},
			deletedAt: {
				type: DataTypes.DATE,
			},
		},
		{
			sequelize,
			underscored: false,
			paranoid: false,
			modelName: "Users",
		}
	);
	return Users;
};
