const express = require('express')
const User = require('../models/user')

const router = new express.Router()

router.post('/users', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    res.status(201).send(user)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.get('/users/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const user = await User.findOne({ _id })
    if (!user) {
      res.sendStatus(404)
    }

    res.send(user)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.patch('/users/:id', async (req, res) => {
  const _id = req.params.id
  const updates = Object.keys(req.body)
  const allowedUpdates = ['firstName', 'lastName', 'email', 'password']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if(!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    const user = await User.findOne({ _id })
      if (!user) {
        res.sendStatus(404)
      }

    updates.forEach((update) => user[update] = req.body[update])
    await user.save()
    res.send(user)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.delete('/users/:id', async (req, res) => {
  const _id = req.params.id
  try {
    const user = await User.findOne({ _id })
      if (!user) {
        res.sendStatus(404)
      }
    await user.remove() 
    res.send(user)
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router