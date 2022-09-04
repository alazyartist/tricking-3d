"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	class Animations extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ Tricks }) {
			// define association here
			this.hasOne(Tricks, {
				foreignKey: "defaultAnimation",
				sourceKey: "animation_id",
			});
		}
	}
	Animations.init(
		{
			animation_id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			animationName: DataTypes.STRING,
			skeleton: DataTypes.STRING,
			fileName: DataTypes.STRING,
			model: DataTypes.STRING,
		},
		{ timestamps: false, sequelize, modelName: "Animations" }
	);
	return Animations;
};
