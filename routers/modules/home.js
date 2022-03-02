import express from 'express'
import User from '#models/schemas/user.js'
import Todo from '#models/schemas/todo.js'
const router = express.Router()

router.get('/', async (req, res, next) => {
  const userId = req.user.id
  try {
    const todos = await Todo.findAll({
      where: { userId },
      order: [
        ['id', 'ASC']
      ],
      raw: true,
      nest: true,
    })
    return res.render('index', { todos })
  } catch (error) {
    return next(error)
  }
})

export default router
