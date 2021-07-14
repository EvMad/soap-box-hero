const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class post extends Model {
    checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
    }
  }

  post.init(
      {
      title: {
          type: DataTypes.STRING,
      //     allowNull: false,
      // primaryKey: true,
      // autoIncrement: true,
      },
      content: {
          type: DataTypes.STRING,
      },
      comment: {
          type: DataTypes.STRING,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
      },
    },
      {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
      });
    
    module.exports = post;


