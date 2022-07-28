"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	class Tricks extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ Stances, Variations, Bases, Combo, Combo_Tricks }) {
			// define association here
			this.belongsToMany(Variations, {
				through: "Trick_Variations",
				foreignKey: "trick_id",
				sourceKey: "trick_id",
			});
			this.belongsTo(Stances, {
				foreignKey: "stance_id",
				sourceKey: "stance_id",
			});
			this.belongsTo(Bases, {
				foreignKey: "base_id",
				sourceKey: "base_id",
				as: "Base",
			});
			this.belongsToMany(Combo, {
				through: Combo_Tricks,
				foreignKey: "trick_id",
				as: "TrickCombos",
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
			base_id: {
				type: DataTypes.STRING,
				references: { model: "Bases", key: "base_id" },
			},
			name: DataTypes.STRING,
			stance_id: {
				type: DataTypes.STRING,
				references: { model: "Stances", key: "stance_id" },
			},
			takeoffStance: DataTypes.STRING,
			landingStance: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Tricks",
		}
	);
	return Tricks;
};
