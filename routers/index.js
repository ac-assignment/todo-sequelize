import express from 'express'
import home from './modules/home.js'
import todo from './modules/todo.js'
import user from './modules/user.js'
import { authenticator } from '#middlewares/auth.js'
const router = express.Router()

router.use('/todo', authenticator, todo)
router.use('/user', user)
router.use('/', authenticator, home)

export default router
