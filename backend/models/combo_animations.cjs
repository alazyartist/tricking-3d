'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Combo_Animations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Combo_Animations.init({
    combo_id: DataTypes.UUID,
    animations_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Combo_Animations',
  });
  return Combo_Animations;
};