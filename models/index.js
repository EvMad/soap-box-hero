const user = require('./user');
const post = require('./post');

user.hasMany(post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
  post.belongsTo(user, {
    foreignKey: 'user_id'
  });

module.exports = { user, post };