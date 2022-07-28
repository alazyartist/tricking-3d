"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	class Tricklist extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ Users, User_Tricklists, Combo, Tricklist_Combos }) {
			// define association here
			this.belongsTo(Users, {
				as: "Owner",
				foreignKey: "owner",
				sourceKey: "owner",
				targetKey: "uuid",
			});
			this.belongsToMany(Users, {
				through: User_Tricklists,
				foreignKey: "tricklist_id",
			});
			this.belongsToMany(Combo, {
				through: Tricklist_Combos,
				foreignKey: "tricklist_id",
				as: "TricklistCombos",
			});
		}
	}
	Tricklist.init(
		{
			tricklist_id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
			},
			name: DataTypes.STRING,
			owner: {
				type: DataTypes.UUID,
				references: { model: "Users", key: "uuid" },
			},
		},
		{
			sequelize,
			modelName: "Tricklist",
		}
	);
	return Tricklist;
};
