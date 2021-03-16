const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// --------搜尋-------- //

router.get('/', (req, res) => {
  const userId = req.user._id
  const keyword = req.query.keyword

  return Restaurant.find({ userId })
    .lean()
    .then(restaurants => {
      const restaurant = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase()))
      res.render('index', { restaurant })
    })
    .catch(error => console.error(error))
})

module.exports = router