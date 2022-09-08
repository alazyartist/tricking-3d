"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	class Tricks extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({
			Stances,
			Users,
			Variations,
			Bases,
			Animations,
			Trick_Variations,
		}) {
			// define association here
			this.belongsToMany(Users, {
				through: "ClaimedTricks",
				foreignKey: "trick_id",
				sourceKey: "trick_id",
				targetKey: "uuid",
				otherKey: "user_id",
			});
			this.belongsToMany(Variations, {
				through: "Trick_Variations",
				foreignKey: "trick_id",
				sourceKey: "trick_id",
				uniqueKey: "id",
			});
			this.hasMany(Trick_Variations, {
				as: "TVariations",
				foreignKey: "trick_id",
				sourceKey: "trick_id",
				targetKey: "trick_id",
				otherKey: "trick_id",
			});
			// this.hasMany(Trick_Variations, {
			// 	foreignKey: "trick_id",
			// 	sourceKey: "trick_id",
			// });
			this.belongsTo(Stances, {
				foreignKey: "stance_id",
				sourceKey: "stance_id",
			});
			this.belongsTo(Bases, {
				foreignKey: "base_id",
				sourceKey: "base_id",
			});
			this.belongsTo(Animations, {
				foreignKey: "defaultAnimation",
				sourceKey: "defaultAnimation",
			});
		}
	}
	Tricks.init(
		{
			trick_id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			name: DataTypes.STRING,
			type: { type: DataTypes.STRING, defaultValue: "Trick" },
			trickType: { type: DataTypes.STRING },
			base_id: {
				type: DataTypes.STRING,
				references: { model: "Bases", key: "base_id" },
			},
			stance_id: {
				type: DataTypes.STRING,
				references: { model: "Stances", key: "stance_id" },
			},
			takeoffStance: DataTypes.STRING,
			landingStance: DataTypes.STRING,
			defaultAnimation: DataTypes.UUID,
		},
		{ timestamps: false, sequelize, modelName: "Tricks" }
	);
	return Tricks;
};
