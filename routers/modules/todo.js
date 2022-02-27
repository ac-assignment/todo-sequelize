import express from 'express'
// import Todo from '../../models/todo.js'
const router = express.Router()

router.get('/new', (req, res) => {
  res.render('new')
})

router.get('/:id', async (req, res) => {
  const userId = req.user._id
  const { id: _id } = req.params
  try {
    const todo = await Todo.findOne({ _id, userId }).lean()
    res.render('detail', { todo })
  } catch (error) {
    console.log(error)
  }
})

router.get('/:id/edit', async (req, res) => {
  const userId = req.user._id
  const { id: _id } = req.params
  try {
    const todo = await Todo.findOne({ _id, userId }).lean()
    res.render('edit', { todo })
  } catch (error) {
    console.log(error)
  }
})

router.post('/', async (req, res) => {
  const userId = req.user._id
  const names = req.body.names.split(',').map(name => ({ name, userId }))
  try {
    await Todo.insertMany(names)
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
})

router.put('/:id', async (req, res) => {
  const userId = req.user._id
  const { id: _id } = req.params
  const { name, isDone } = req.body
  try {
    const todo = await Todo.findOne({ _id, userId })
    todo.name = name
    todo.isDone = isDone === 'on'
    await todo.save()
    res.redirect(`/todo/${_id}`)
  } catch (error) {
    console.log(error)
  }
})

router.delete('/:id', async (req, res) => {
  const userId = req.user._id
  const { id: _id } = req.params
  try {
    const todo = await Todo.findOne({ _id, userId })
    await todo.remove()
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
})

export default router
