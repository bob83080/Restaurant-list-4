const express = require('express')
const session = require('express-session')
const app = express()
const port = 3001
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const routes = require('./routes')

const usePassport = require('./config/passport')

require('./config/mongoose')

// --------路由設定-------- //

app.engine('handlebars', exphbs({ defaultLayouts: 'main' }))
app.set('view engine', 'handlebars')
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))

usePassport(app)

app.use((req, res, next) => {
  // 你可以在這裡 console.log(req.user) 等資訊來觀察
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

app.use(routes)


app.listen(port, () => {
  console.log(`Express is listening on localhost: ${port}`)
})