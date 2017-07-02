const Router = require('express-promise-router')

const db = require('../db')

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()

// export our router to be mounted by the parent application
module.exports = router

router.get('/', async (req, res) => {
  const queryStr = 'select * from entries order by random() limit 200'
  const { rows } = await db.query(queryStr)

  rows.sort(sortByLike);

  new_rows = rows.slice(100)

  res.send(new_rows)
})

sortByLike = (a, b) => a.like - b.like;