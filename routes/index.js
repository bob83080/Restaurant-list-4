const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const restaurant = require('./modules/restaurant')
const search = require('./modules/search')
const create = require('./modules/create')
const sort = require('./modules/sort')
const users = require('./modules/users')
// const auth = require('./modules/auth')

const { authenticator } = require('../middleware/auth')


router.use('/restaurant', authenticator, restaurant)
router.use('/search', authenticator, search)
router.use('/new', authenticator, create)
router.use('/sort', authenticator, sort)
router.use('/users', users)
router.use('/', authenticator, home)


module.exports = router