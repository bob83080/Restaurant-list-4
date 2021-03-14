const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const restaurant = require('./modules/restaurant')
const search = require('./modules/search')
const create = require('./modules/create')
const sort = require('./modules/sort')
const users = require('./modules/users')

router.use('/', home)
router.use('/restaurant', restaurant)
router.use('/search', search)
router.use('/new', create)
router.use('/sort', sort)
router.use('/users', users)

module.exports = router