import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcryptjs'
// import User from '../models/user.js'

export default (app) => {
  //初始化
  app.use(passport.initialize())
  app.use(passport.session())
  //設定登入策略
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      try {
        const user = await User.findOne({ email })
        if (!user) {
          req.flash('error', 'That email is not registered!')
          return done(null, false)
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
          req.flash('error', 'Email or Password incorrect.')
          return done(null, false)
        }
        return done(null, user)
      } catch (error) {
        return done(error, false)
      }
    }
  ))
  //序列化/反序列化
  passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).lean()
      done(null, user)
    } catch (error) {
      done(error, false)
    }
  })
}
