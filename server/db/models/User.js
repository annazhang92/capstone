const conn = require('../conn');
const { Sequelize } = conn;

const User = conn.define('user', {
  firstName: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  userStatus: {
    type: Sequelize.STRING,
    // allowNull: false
  }
}, {
  timestamps: false,
  getterMethods: {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    }
  }
});

module.exports = User;