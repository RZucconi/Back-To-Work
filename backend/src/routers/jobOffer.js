const express = require('express')
const JobOffer = require('../models/jobOffer')
const auth = require('../middleware/auth')
const upload = require('../middleware/upload')

const router = new express.Router()

router.post('/jobOffers', auth, async(req, res) => {
  const jobOffer = new JobOffer({
    ...req.body,
    owner: req.user._id
  })

  try{
    await jobOffer.save(
      res.status(201).send(jobOffer)
    )
  } catch (err) {
    res.status(400).send(err)
  }
})

router.post('/jobOffers/:id/add_cv', auth, upload.single('cv'), async (req, res) => {
  const _id = req.params.id
  const { buffer, mimetype } = req.file
  const jobOffer = await JobOffer.findOne({ _id, owner: req.user._id})

  if (!jobOffer) {
    return res.status(404).send()
  }

  jobOffer.curriculumVitae = { buffer, mimetype }
  await jobOffer.save()
  res.send()
}, (error, req, res, next) => {
  res.status(400).send({ 'error': error.message })
})

router.post('/jobOffers/:id/add_coverLetter', auth, upload.single('coverLetter'), async (req, res) => {
  const _id = req.params.id
  const { buffer, mimetype } = req.file
  const jobOffer = await JobOffer.findOne({ _id, owner: req.user._id})

  if (!jobOffer) {
    return res.status(404).send()
  }

  jobOffer.coverLetter = { buffer, mimetype }
  await jobOffer.save()
  res.send()
}, (error, req, res, next) => {
  res.status(400).send({ 'error': error.message })
})


// GET /jobOffers?completed=false -> filter
// GET /jobOffers?limit=10&skip=0 -> pagination
// GET /jobOffers?sortBy=createdAt:desc -> sort
router.get('/jobOffers', auth, async (req, res) => {
  const match = {}
  const sort = {}

  if (req.query.completed) {
    match.completed = req.query.completed === 'true'
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':')
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
  }

  try{
    await req.user.populate({
      path: 'jobOffers',
      match,
      options: {
        limit: parseInt(req.query.limit),
        ship: parseInt(req.query.skip),
        sort
      }
    }).execPopulate()
    res.send(req.user.jobOffers)
  } catch (err) {
    res.status(500).send()
  }
})

router.get('/jobOffers/:id', auth, async (req, res) => {
  const _id = req.params.id
  
  try {
    const jobOffer = await JobOffer.findOne({ _id, owner: req.user._id })
    if (!jobOffer) {
      res.sendStatus(404)
    }

  jobOffer.curriculumVitae = undefined
  jobOffer.coverLetter = undefined
    
    res.send(jobOffer)
  } catch (err) {
    res.status(400).send()
  }
})

router.get('/jobOffers/:id/cv', auth, async (req, res) => {
  const _id = req.params.id
  
  try {
    const jobOffer = await JobOffer.findOne({ _id, owner: req.user._id })
    
    if (!jobOffer || !jobOffer.curriculumVitae.buffer) {
      throw new Error()
    }

    res.set('Content-Type', jobOffer.curriculumVitae.mimetype)
    res.send(jobOffer.curriculumVitae.buffer)
  } catch (err) {
    res.status(404).send()
  }
})

router.get('/jobOffers/:id/coverLetter', auth, async (req, res) => {
  const _id = req.params.id
  
  try {
    const jobOffer = await JobOffer.findOne({ _id, owner: req.user._id })

    if (!jobOffer || !jobOffer.coverLetter.buffer) {
      throw new Error()
    }

    res.set('Content-Type', jobOffer.coverLetter.mimetype)
    res.send(jobOffer.coverLetter.buffer)
  } catch (err) {
    res.status(404).send()
  }
})

router.patch('/jobOffers/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['contactName', 'contactEmail', 'contactPhone', 'contactCellphone', 'comment', 'completed']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    const jobOffer = await JobOffer.findOne({ _id: req.params.id, owner: req.user._id })

    if (!jobOffer) {
      return res.status(404).send()
    }

    updates.forEach((update) => jobOffer[update] = req.body[update])
    await jobOffer.save()
    jobOffer.curriculumVitae = undefined
    jobOffer.coverLetter = undefined
    res.send(jobOffer)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.delete('/jobOffers/:id', auth, async (req, res) => {
  try {
    const jobOffer = await JobOffer.findOneAndDelete({ _id: req.params.id, owner: req.user._id})

    if (!jobOffer) {
      return res.status(404).send()
    }

    res.send(jobOffer)
  } catch (err) {
    res.status(500).send()
  }
})

module.exports = router