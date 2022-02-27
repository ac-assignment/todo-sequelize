import express from 'express'
import session from 'express-session'
import exphbs from 'express-handlebars'
import methodOverride from 'method-override'
import flash from 'connect-flash'
import usePassport from '#configs/passport.js'
import viewData from '#middlewares/viewData.js'
import router from './routers/index.js'

const app = express()
const PORT = 3000

app.engine('hbs', exphbs.create({ defaultLayout: 'main', extname: '.hbs' }).engine)
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
usePassport(app)
app.use(viewData)
app.use(router)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
