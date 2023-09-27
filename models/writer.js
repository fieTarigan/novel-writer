'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Writer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Writer.belongsToMany(models.Novel, {
        through: models.NovelWriter,
        foreignKey: "writerId",
      });
    }
  }
  Writer.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "Name cannot be empty.",
        }
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: true,
        min: 1,
      },
    },
    birthTown: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    hooks: {
      beforeValidate: (writer, options) => {
        writer.age = Number(writer.age);
      },
    },
    sequelize,
    modelName: 'Writer',
  });
  return Writer;
};