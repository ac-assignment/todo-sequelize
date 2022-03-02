import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('todo_sequelize', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '+08:00',
})

export default sequelize
