"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	class SessionSources extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ SessionSummaries, SessionData }) {
			// define association here
			this.belongsTo(SessionSummaries, {
				foreignKey: "sessionid",
				sourceKey: "sessionid",
				targetKey: "sessionid",
				constraints: false,
			});

			this.hasMany(SessionData, {
				foreignKey: "srcid",
				sourceKey: "srcid",
				targetKey: "srcid",
				constraints: false,
			});
		}
	}
	SessionSources.init(
		{
			srcid: DataTypes.UUID,
			sessionid: DataTypes.UUID,
			vidsrc: DataTypes.STRING,
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE,
		},
		{
			sequelize,
			modelName: "SessionSources",
		}
	);
	return SessionSources;
};
