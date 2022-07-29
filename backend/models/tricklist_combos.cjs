"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	class Tricklist_Combos extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ Combo, Tricklist }) {
			// define association here
			this.belongsTo(Combo, { foreignKey: "combo_id" });
			this.belongsTo(Tricklist, { foreignKey: "tricklist_id" });
		}
	}
	Tricklist_Combos.init(
		{
			tricklist_id: DataTypes.UUID,
			combo_id: DataTypes.UUID,
		},
		{
			sequelize,
			modelName: "Tricklist_Combos",
		}
	);
	return Tricklist_Combos;
};
