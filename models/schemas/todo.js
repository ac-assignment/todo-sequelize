import { DataTypes } from 'sequelize'
import sequelize from '#configs/sequelize.js'
import User from './user.js'

const Todo = sequelize.define('Todo', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isDone: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    }
  }
})

export default Todo
