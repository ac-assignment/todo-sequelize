import express from 'express'
// import Todo from '../../models/todo.js'
const router = express.Router()

router.get('/', async (req, res) => {
  const userId = req.user._id
  try {
    // const todos = await Todo.find({ userId })
    //   .lean()
    //   .sort({ _id: 'asc' })
    // res.render('index', { todos })
    res.render('index')
  } catch (error) {
    console.log(error)
  }
})

export default router
