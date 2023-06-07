"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	class Users extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({
			Users,
			Captures,
			Tricks,
			Tricklist,
			ClaimedCombos,
			ClaimedTricks,
			Combo,
			User_Tricklists,
			Profile,
			BattleRooms,
			SessionSummaries,
		}) {
			this.hasMany(SessionSummaries, {
				foreignKey: "user_id",
				sourceKey: "uuid",
				targetKey: "user_id",
				constraints: false,
			});
			this.belongsToMany(SessionSummaries, {
				as: "sessionSummaries",
				through: "User_Sessions",
				foreignKey: "user_id",
				sourceKey: "uuid",
				otherKey: "sessionid",
				targetKey: "sessionid",
			});
			// define association here
			this.belongsToMany(Users, {
				through: Captures,
				as: "Captured",
				foreignKey: "user_id",
				otherKey: "captured_id",
				sourceKey: "id",
				targetKey: "id",
			});
			this.belongsToMany(Users, {
				through: Captures,
				as: "CapturedMe",
				foreignKey: "captured_id",
				otherKey: "user_id",
				sourceKey: "id",
				targetKey: "id",
			});
			this.hasMany(BattleRooms, {
				foreignKey: "host",
				sourceKey: "uuid",
				targetKey: "host",
				constraints: false,
			});
			this.hasMany(Tricklist, {
				as: "MyTricklists",
				foreignKey: "owner",
				sourceKey: "uuid",
				targetKey: "owner",
			});
			this.belongsToMany(Tricklist, {
				through: User_Tricklists,
				foreignKey: "user_id",
				sourceKey: "uuid",
				targetKey: "tricklist_id",
				otherKey: "tricklist_id",
			});
			this.belongsToMany(Tricks, {
				through: ClaimedTricks,
				as: "TricksClaimed",
				foreignKey: "user_id",
				otherKey: "trick_id",
				sourceKey: "uuid",
				targetKey: "trick_id",
			});
			this.belongsToMany(Combo, {
				through: ClaimedCombos,
				as: "CombosClaimed",
				foreignKey: "user_id",
				sourceKey: "uuid",
				otherKey: "combo_id",
				targetKey: "combo_id",
			});
			this.hasOne(Profile, { foreignKey: "user_id", sourceKey: "uuid" });
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
			clerk_id: {
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
			SessionReviewCredits: {
				type: DataTypes.INTEGER,
			},
			TotalPoints: {
				type: DataTypes.FLOAT,
			},
			isAdmin: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
				allowNull: false,
			},
			adminAccess: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
				allowNull: false,
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
			paranoid: true,
			modelName: "Users",
		}
	);
	return Users;
};
