import sequelize from '#configs/sequelize.js'
import User from './schemas/user.js'
import Todo from './schemas/todo.js'

await sequelize.authenticate()
await User.sync({ alter: true })
await Todo.sync({ alter: true })

process.exit()
