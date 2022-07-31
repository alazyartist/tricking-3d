"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	class Combo extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ Tricks, Tricklist, Tricklist_Combos, Combo_Tricks }) {
			// define association here
			this.belongsToMany(Tricks, {
				through: { model: Combo_Tricks, unique: false },
				foreignKey: "combo_id",
				as: "ComboTricks",
			});
			this.belongsToMany(Tricklist, {
				through: { model: Tricklist_Combos, unique: false },
				as: "TricklistItems",
				foreignKey: "combo_id",
			});
		}
	}
	Combo.init(
		{
			combo_id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
			},
			creator: DataTypes.UUID,
			name: DataTypes.STRING,
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE,
		},
		{
			sequelize,
			modelName: "Combo",
		}
	);
	return Combo;
};
