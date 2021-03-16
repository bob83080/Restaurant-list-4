const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// --------細節頁面-------- //
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// --------生產新頁面-------- //
router.post('/new', (req, res) => {
  const userId = req.user._id
  if (req.body.image.length === 0) { req.body.image = 'https://www.teknozeka.com/wp-content/uploads/2020/03/wp-header-logo-33.png' }
  const { name, category, image, location, phone, rating, description } = req.body
  return Restaurant.create({ name, category, image, location, phone, google_map, rating, description, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// --------修改頁面-------- //
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', restaurant))
    .catch(error => console.log(error))
})

// --------更新頁面-------- //
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      restaurant.name = req.body.name
      restaurant.category = req.body.category
      restaurant.image = req.body.image
      restaurant.loction = req.body.location
      restaurant.phone = req.body.phone
      restaurant.rating = req.body.rating
      restaurant.google_map = req.body.google_map
      restaurant.description = req.body.description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurant/${id}`))
    .catch(error => console.log(error))
})
// --------刪除頁面-------- //
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('back'))
    .catch(error => console.log(error))
})

module.exports = router