'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Novel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Novel.belongsToMany(models.Writer, {
        through: models.NovelWriter,
        foreignKey: "novelId",
      });
    }
  }
  Novel.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "Title cannot be empty.",
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
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: true,
        min: 0,
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: true,
        min: 0,
      },
    },
  }, {
    hooks: {
      beforeValidate: (novel, options) => {
        if (novel.image === '') {
          novel.image = 'https://cdn.icon-icons.com/icons2/1632/PNG/256/62857notebookwithdecorativecover_109284.png';
        }
        novel.price = Number(novel.price);
        novel.stock = Number(novel.stock);
      },
    },
    sequelize,
    modelName: 'Novel',
  });
  return Novel;
};