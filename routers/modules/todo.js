import express from 'express'
import Todo from '#models/schemas/todo.js'
const router = express.Router()

router.get('/new', (req, res) => {
  res.render('new')
})

router.get('/:id', async (req, res, next) => {
  const userId = req.user.id
  const { id } = req.params
  try {
    const todo = await Todo.findOne({ where: { id, userId }, raw: true, nest: true })
    if (!todo) {
      res.redirect('/')
    }
    res.render('detail', { todo })
  } catch (error) {
    return next(error)
  }
})

router.get('/:id/edit', async (req, res, next) => {
  const userId = req.user.id
  const { id } = req.params
  try {
    const todo = await Todo.findOne({ where: { id, userId }, raw: true, nest: true })
    if (!todo) {
      res.redirect('/')
    }
    res.render('edit', { todo })
  } catch (error) {
    return next(error)
  }
})

router.post('/', async (req, res, next) => {
  const userId = req.user.id
  const todos = req.body.names.split(',').map(name => ({ name, userId }))
  try {
    await Todo.bulkCreate(todos)
    res.redirect('/')
  } catch (error) {
    return next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  const userId = req.user.id
  const { id } = req.params
  const { name, isDone } = req.body
  try {
    const todo = await Todo.findOne({ where: { id, userId } })
    todo.name = name
    todo.isDone = isDone === 'on'
    await todo.save()
    res.redirect(`/todo/${id}`)
  } catch (error) {
    return next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  const userId = req.user.id
  const { id } = req.params
  try {
    const todo = await Todo.findOne({ where: { id, userId } })
    await todo.destroy()
    res.redirect('/')
  } catch (error) {
    return next(error)
  }
})

export default router
