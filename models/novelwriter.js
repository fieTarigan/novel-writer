'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NovelWriter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      NovelWriter.belongsTo(models.Novel, {
        foreignKey: "novelId"
      });
      NovelWriter.belongsTo(models.Writer, {
        foreignKey: "writerId"
      });
    }
  }
  NovelWriter.init({
    novelId: DataTypes.INTEGER,
    writerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'NovelWriter',
  });
  return NovelWriter;
};