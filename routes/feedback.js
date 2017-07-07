const Router = require('express-promise-router')

const db = require('../db')

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()

// export our router to be mounted by the parent application
module.exports = router

router.post('/', async (req, res) => {
  const { comment, email, phone } = req.body
  await db.query('INSERT INTO feedbacks (comment, email, phone) VALUES ($1, $2, $3)', [comment, email, phone])
  res.send({ status: 'success'})
})