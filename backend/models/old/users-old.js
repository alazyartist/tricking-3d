`use strict`;
import { Sequelize } from "sequelize";
export const User = (sequelize) => {
	//sequelize.define(modelName, attributes, options)

	return sequelize.define(
		"Users",
		{
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			username: {
				type: Sequelize.STRING,
				len: [2, 50],
				allowNull: true,
				unique: true,
			},
			first_name: {
				type: Sequelize.STRING,
				required: true,
			},
			last_name: {
				type: Sequelize.STRING,
				required: true,
			},
			email: {
				type: Sequelize.STRING,
				isEmail: true,
				required: true,
				unique: true,
			},
			password: {
				type: Sequelize.STRING,
				required: true,
				allowNull: false,
			},
			refreshToken: {
				field: "refresh_token",
				type: Sequelize.STRING,
			},
			uuid: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			profilePic: {
				field: "profile_pic",
				type: Sequelize.STRING,
			},

			createdAt: {
				field: "created_at",
				type: Sequelize.DATE,
			},
			updatedAt: {
				field: "updated_at",
				type: Sequelize.DATE,
			},
			deletedAt: {
				field: "deleted_at",
				type: Sequelize.DATE,
			},
		},
		{
			underscored: true,
			paranoid: true,
		}
	);
};
