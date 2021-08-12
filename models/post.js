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
      id: {
        type: DataTypes.INTEGER,
          allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      },

      title: {
          type: DataTypes.STRING,

      
      },
      content: {
          type: DataTypes.TEXT,

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


