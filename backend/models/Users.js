`use strict`;

export const User = (sequelize, DataTypes) => {
	//sequelize.define(modelName, attributes, options)

	return sequelize.define(
		"User",
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
			},
			user_name: {
				type: DataTypes.STRING,
				len: [2, 50],
				allowNull: true,
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
			},
			password: {
				type: DataTypes.STRING,
				required: true,
			},
			account_created: {
				type: DataTypes.STRING,
				required: true,
			},
		},
		{
			underscored: true,
			paranoid: true,
		}
	);
};
