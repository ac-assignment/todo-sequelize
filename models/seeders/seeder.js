import bcrypt from 'bcryptjs'
import User from '#models/schemas/user.js'
import Todo from '#models/schemas/todo.js'

const SEED_USER = {
  name: 'root',
  email: 'root@gmail.com',
  password: '12345678'
}

const user = await User.create({
  name: SEED_USER.name,
  email: SEED_USER.email,
  password: bcrypt.hashSync(SEED_USER.password, bcrypt.genSaltSync(10))
})

await Todo.bulkCreate(Array.from({ length: 10 }).map((_, i) => ({
  name: `item-${i}`,
  userId: user.id,
})))

process.exit()
